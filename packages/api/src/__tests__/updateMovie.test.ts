import { Mongoose } from "mongoose";
import { MovieModel } from "../db-models/movie";
import { UserModel } from "../db-models/user";
import { ERROR } from "../errors";
import { Movie, Role, User } from "../gql/types";
import { movie1, movie2 } from "./data/movie";
import { user } from "./data/user";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { REGISTER, UPDATE_MOVIE } from "./queries";
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

describe("updateMovie", () => {
  it("should update a movie", async () => {
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

    // update movie
    const result1 = await graphQLHelper(
      UPDATE_MOVIE,
      { updateMovieId: movie._id.toString(), input: movie2 },
      {
        user: {
          ...register,
          id: register.id,
          role: Role.Admin,
          authToken: register.authToken
        }
      }
    );
    const { updateMovie } = result1.data as { updateMovie: Movie };

    expect(updateMovie).toMatchObject(movie2);

    // check movie is updated in database
    const movieDB = await MovieModel.findOne({ title: movie2.title });
    expect(movieDB).toMatchObject(movie2);

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.findByIdAndDelete(register.id);
  });

  it("should not update a movie if user is not admin", async () => {
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

    // update movie
    const result1 = await graphQLHelper(
      UPDATE_MOVIE,
      { updateMovieId: movie._id.toString(), input: movie2 },
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
      ERROR.ROLE_NEEDED.message
    );

    // check movie is not updated in database
    const movieDB = await MovieModel.findOne({ title: movie.title });
    expect(movieDB).toMatchObject(movie1);

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.findByIdAndDelete(register.id);
  });

  it("should not update a movie if movie does not exist", async () => {
    const id = new ObjectId();
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // update movie
    const result1 = await graphQLHelper(
      UPDATE_MOVIE,
      { updateMovieId: id.toString(), input: movie2 },
      {
        user: {
          ...register,
          id: register.id,
          role: Role.Admin,
          authToken: register.authToken
        }
      }
    );

    // check error response
    expect((result1 as any)?.errors[0].message).toMatch(
      ERROR.MOVIE_NOT_FOUND.message
    );

    // clean database
    await UserModel.findByIdAndDelete(register.id);
    await MovieModel.deleteMany({});
  });

  it("should not update a movie if the title is already taken", async () => {
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

    // create movie2 in database
    const movie_2 = new MovieModel(movie2);
    await movie_2.save();

    // update movie
    const result1 = await graphQLHelper(
      UPDATE_MOVIE,
      {
        updateMovieId: movie._id.toString(),
        input: {
          title: movie2.title
        }
      },
      {
        user: {
          ...register,
          id: register.id,
          role: Role.Admin,
          authToken: register.authToken
        }
      }
    );

    // check error response
    expect((result1 as any)?.errors[0].message).toMatch(
      ERROR.MOVIE_ALREADY_EXISTS.message
    );

    // check movie is not updated in database
    const movieDB = await MovieModel.findOne({ title: movie.title });
    expect(movieDB).toMatchObject(movie1);

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.findByIdAndDelete(register.id);
  });

  it("should not update a movie if the trailer updated is not a valid id", async () => {
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

    // update movie
    const result1 = await graphQLHelper(
      UPDATE_MOVIE,
      {
        updateMovieId: movie._id.toString(),
        input: {
          trailer: "123"
        }
      },
      {
        user: {
          ...register,
          id: register.id,
          role: Role.Admin,
          authToken: register.authToken
        }
      }
    );

    // check error response
    expect((result1 as any)?.errors[0].message).toMatch(
      ERROR.INVALID_VIDEO_ID.message
    );

    // check movie is not updated in database
    const movieDB = await MovieModel.findOne({ title: movie.title });
    expect(movieDB).toMatchObject(movie1);

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.findByIdAndDelete(register.id);
  });
});
