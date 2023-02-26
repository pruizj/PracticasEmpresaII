import { Mongoose } from "mongoose";
import { MovieModel } from "../db-models/movie";
import { UserModel } from "../db-models/user";
import { ERROR } from "../errors";
import { Movie, Role, User } from "../gql/types";
import { movie1 } from "./data/movie";
import { user } from "./data/user";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { ADD_RATING_TO_MOVIE, REGISTER } from "./queries";
import { ObjectId } from "bson";

let db: Mongoose;

beforeAll(async () => {
  const result = await BeforeAll(db);
  db = result;
});

afterAll(async () => {
  const result = await AfterAll(db);
  db = result;
});

describe("addRatingToMovie", () => {
  it("should add a rating to a movie", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create movie in database
    const movie = new MovieModel(movie1);
    await movie.save();

    // add rating to movie
    const result1 = await graphQLHelper(
      ADD_RATING_TO_MOVIE,
      { addRatingToMovieId: movie._id.toString(), rating: 2 },
      {
        user: {
          ...register,
          id: register.id,
          role: Role.User,
          authToken: register.authToken
        }
      }
    );

    const { addRatingToMovie } = result1.data as { addRatingToMovie: Movie };

    expect(addRatingToMovie.rating).toBe(Math.round((movie1.rating + 2) / 2));

    // check rating is added in database
    const movieDB = await MovieModel.findOne({ title: movie1.title });
    expect(movieDB?.rating).toBe(Math.round((movie1.rating + 2) / 2));

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.findByIdAndDelete(register.id);
  });

  it("should not add a rating if user is not logged in", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create movie in database
    const movie = new MovieModel(movie1);
    await movie.save();

    // add rating to movie
    const result1 = await graphQLHelper(
      ADD_RATING_TO_MOVIE,
      { addRatingToMovieId: movie._id.toString(), rating: 2 },
      { user: undefined }
    );

    // check error response
    expect((result1 as any)?.errors[0].message).toMatch(
      ERROR.LOGIN_NEEDED.message
    );

    // check rating is not added in database
    const movieDB = await MovieModel.findOne({ title: movie1.title });
    expect(movieDB?.rating).toBe(movie1.rating);

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.findByIdAndDelete(register.id);
  });

  it("should not add a rating if movie does not exist", async () => {
    const id = new ObjectId();

    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // add rating to movie
    const result1 = await graphQLHelper(
      ADD_RATING_TO_MOVIE,
      { addRatingToMovieId: id.toString(), rating: 2 },
      {
        user: {
          ...register,
          id: register.id,
          role: Role.User,
          authToken: register.authToken
        }
      }
    );
    // check error response
    expect((result1 as any)?.errors[0].message).toMatch(
      ERROR.MOVIE_NOT_FOUND.message
    );

    // check movie is not added in database
    const movieDB = await MovieModel.findById(id.toString());
    expect(movieDB).toBeNull();

    // clean database
    await UserModel.findByIdAndDelete(register.id);
    await MovieModel.deleteMany({});
  });

  it("should not add a rating if rating is not between 1 and 5", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create movie in database
    const movie = new MovieModel(movie1);
    await movie.save();

    // add rating to movie
    const result1 = await graphQLHelper(
      ADD_RATING_TO_MOVIE,
      { addRatingToMovieId: movie._id.toString(), rating: 6 },
      {
        user: {
          ...register,
          id: register.id,
          role: Role.User,
          authToken: register.authToken
        }
      }
    );
    // check error response
    expect((result1 as any)?.errors[0].message).toMatch(
      ERROR.INVALID_RATING.message
    );

    // check rating is not added in database
    const movieDB = await MovieModel.findOne({ title: movie1.title });
    expect(movieDB?.rating).toBe(movie1.rating);

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.findByIdAndDelete(register.id);
  });
});
