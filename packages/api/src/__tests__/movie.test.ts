import { Mongoose } from "mongoose";
import { MovieModel } from "../db-models/movie";
import { UserModel } from "../db-models/user";
import { Movie, User } from "../gql/types";
import { movie1 } from "./data/movie";
import { user } from "./data/user";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { ObjectId } from "bson";
import { MOVIE, REGISTER } from "./queries";
import { ERROR } from "../errors";

let db: Mongoose;

beforeAll(async () => {
  const result = await BeforeAll(db);
  db = result;
});

afterAll(async () => {
  const result = await AfterAll(db);
  db = result;
});

describe("Movie", () => {
  it("should return movie", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create movie in database
    const newMovie = new MovieModel(movie1);
    await newMovie.save();

    // get movie
    const result2 = await graphQLHelper(
      MOVIE,
      { movieId: newMovie.id },
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const { movie } = result2.data as { movie: Movie };

    expect(movie).toMatchObject({
      ...movie1,
      id: newMovie._id.toString()
    });

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should return error if movie is not found", async () => {
    const id = new ObjectId();

    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // get movie
    const result1 = await graphQLHelper(
      MOVIE,
      { movieId: id.toString() },
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    // check error response
    expect((result1 as any)?.errors[0].message).toMatch(
      ERROR.MOVIE_NOT_FOUND.message
    );

    // clean database
    await UserModel.deleteMany({});
    await MovieModel.deleteMany({});
  });
});
