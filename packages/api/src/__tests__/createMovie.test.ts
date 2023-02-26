import { BeforeAll, AfterAll } from "./functions";
import { Mongoose } from "mongoose";
import { graphQLHelper } from "./graphqlHelper";
import { CREATE_MOVIE, REGISTER } from "./queries";
import { user } from "./data/user";
import { UserModel } from "../db-models/user";
import { Movie, Role, User } from "../gql/types";
import { movie1 } from "./data/movie";
import { MovieModel } from "../db-models/movie";
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

describe("createMovie", () => {
  it("should create a movie", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    await UserModel.findByIdAndUpdate(register.id, { role: Role.Admin });

    const result1 = await graphQLHelper(
      CREATE_MOVIE,
      { input: movie1 },
      {
        user: {
          ...register,
          id: register.id,
          role: Role.Admin,
          authToken: register.authToken
        }
      }
    );

    const { createMovie } = result1.data as { createMovie: Movie };

    expect(createMovie).toMatchObject(movie1);

    // check movie is created in database
    const movieDB = await MovieModel.findById(createMovie.id);
    expect(movieDB).toMatchObject(movie1);

    // clean database
    await MovieModel.findByIdAndDelete(createMovie.id);
    await UserModel.findByIdAndDelete(register.id);
  });

  it("should not create a movie if user is not admin", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    const result1 = await graphQLHelper(
      CREATE_MOVIE,
      { input: movie1 },
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

    // check movie is not created in database
    const movieDB = await MovieModel.findOne({ title: movie1.title });
    expect(movieDB).toBeNull();

    // clean database
    await UserModel.findByIdAndDelete(register.id);
    await MovieModel.deleteMany({});
  });

  it("should not create a movie if duration invalid", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    const result1 = await graphQLHelper(
      CREATE_MOVIE,
      { input: { ...movie1, duration: 0 } },
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
      ERROR.INVALID_DURATION.message
    );

    // check movie is not created in database
    const movieDB = await MovieModel.findOne({ title: movie1.title });
    expect(movieDB).toBeNull();

    // clean database
    await UserModel.findByIdAndDelete(register.id);
    await MovieModel.deleteMany({});
  });

  it("should not create a movie if rating invalid", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    const result1 = await graphQLHelper(
      CREATE_MOVIE,
      { input: { ...movie1, rating: 6 } },
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
      ERROR.INVALID_RATING.message
    );

    // check movie is not created in database
    const movieDB = await MovieModel.findOne({ title: movie1.title });
    expect(movieDB).toBeNull();

    // clean database
    await UserModel.findByIdAndDelete(register.id);
    await MovieModel.deleteMany({});
  });

  it("should not create a movie if trailer invalid", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    const result1 = await graphQLHelper(
      CREATE_MOVIE,
      { input: { ...movie1, trailer: "SuehATaxME" } },
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

    // check movie is not created in database
    const movieDB = await MovieModel.findOne({ title: movie1.title });
    expect(movieDB).toBeNull();

    // clean database
    await UserModel.findByIdAndDelete(register.id);
    await MovieModel.deleteMany({});
  });

  it("should not create a movie if movie already exists", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create movie in database
    const movieDB = await MovieModel.create(movie1);

    const result1 = await graphQLHelper(
      CREATE_MOVIE,
      { input: movie1 },
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

    // check movie is not created in database
    const movieDB1 = await MovieModel.find({ title: movie1.title });
    expect(movieDB1.length).toBe(1);

    // clean database
    await UserModel.findByIdAndDelete(register.id);
    await MovieModel.findByIdAndDelete(movieDB.id);
  });
});
