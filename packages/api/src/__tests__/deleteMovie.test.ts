import { Mongoose } from "mongoose";
import { MovieModel } from "../db-models/movie";
import { UserModel } from "../db-models/user";
import { ERROR } from "../errors";
import { Movie, Role, User } from "../gql/types";
import { movie1 } from "./data/movie";
import { user } from "./data/user";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { ObjectId } from "bson";
import { DELETE_MOVIE, REGISTER } from "./queries";
import { CinemaModel } from "../db-models/cinema";

let db: Mongoose;

beforeAll(async () => {
  const result = await BeforeAll(db);
  db = result;
});

afterAll(async () => {
  const result = await AfterAll(db);
  db = result;
});

describe("deleteMovie", () => {
  it("should delete a movie", async () => {
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

    // delete movie
    const result1 = await graphQLHelper(
      DELETE_MOVIE,
      { deleteMovieId: movie.id },
      {
        user: {
          ...register,
          id: register.id,
          role: Role.Admin,
          authToken: register.authToken
        }
      }
    );
    const { deleteMovie } = result1.data as { deleteMovie: Movie };

    expect(deleteMovie).toMatchObject(movie1);

    // check movie is deleted in database
    const movieDB = await MovieModel.findById(deleteMovie.id);
    expect(movieDB).toBeNull();

    // clean database
    await MovieModel.findByIdAndDelete(movie.id);
    await UserModel.findByIdAndDelete(register.id);
  });

  it("should not delete a movie if user is not admin", async () => {
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

    // delete movie
    const result1 = await graphQLHelper(
      DELETE_MOVIE,
      { deleteMovieId: movie.id },
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

    // check movie is not deleted in database
    const movieDB = await MovieModel.findOne({ title: movie1.title });
    expect(movieDB).not.toBeNull();

    // clean database
    await MovieModel.findByIdAndDelete(movie.id);
    await UserModel.findByIdAndDelete(register.id);
  });

  it("should delete a movie and deleted the movie from cinemas", async () => {
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

    const movie_1 = new MovieModel({ ...movie1, title: "Movie 2" });
    await movie_1.save();

    // create cinemas with movie in database
    const cinema1 = new CinemaModel({
      name: "Cinema 1",
      address: "Address 1",
      rooms: 3,
      capacity: 100,
      schedule: [
        {
          day: "Monday",
          time: "10:00",
          room: 1,
          capacity: 100,
          movie: movie._id
        },
        {
          day: "Tuesday",
          time: "10:00",
          room: 1,
          capacity: 100,
          movie: movie_1._id
        }
      ]
    });
    await cinema1.save();

    // delete movie
    const result1 = await graphQLHelper(
      DELETE_MOVIE,
      { deleteMovieId: movie.id },
      {
        user: {
          ...register,
          id: register.id,
          role: Role.Admin,
          authToken: register.authToken
        }
      }
    );

    const { deleteMovie } = result1.data as { deleteMovie: Movie };

    expect(deleteMovie).toMatchObject(movie1);

    // check movie is deleted in database
    const movieDB = await MovieModel.findById(deleteMovie.id);
    expect(movieDB).toBeNull();

    // check movie is deleted from cinemas
    const cinemaDB = await CinemaModel.findById(cinema1.id);
    expect(cinemaDB?.schedule).toHaveLength(1);
    expect(cinemaDB?.schedule[0].movie.toString()).toBe(movie_1.id);

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.deleteMany({});
    await CinemaModel.deleteMany({});
  });

  it("should not delete a movie if movie does not exist", async () => {
    const id = new ObjectId();
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // delete movie
    const result1 = await graphQLHelper(
      DELETE_MOVIE,
      { deleteMovieId: id.toString() },
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
    await MovieModel.findByIdAndDelete(id);
  });
});
