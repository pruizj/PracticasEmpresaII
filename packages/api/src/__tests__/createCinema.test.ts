import { Mongoose } from "mongoose";
import { CinemaModel } from "../db-models/cinema";
import { MovieModel } from "../db-models/movie";
import { UserModel } from "../db-models/user";
import { ERROR } from "../errors";
import { Cinema, Role, User } from "../gql/types";
import { cinema1 } from "./data/cinema";
import { movie1, movie2, movie3 } from "./data/movie";
import { user } from "./data/user";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { CREATE_CINEMA, REGISTER } from "./queries";
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

describe("createCinema", () => {
  it("should create a cinema", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    await UserModel.findByIdAndUpdate(register.id, { role: Role.Admin });

    // create Movies
    const movie_1 = new MovieModel(movie1);
    await movie_1.save();
    const movie_2 = new MovieModel(movie2);
    await movie_2.save();
    const movie_3 = new MovieModel(movie3);
    await movie_3.save();

    const cinemaIn = {
      ...cinema1,
      schedule: [
        {
          day: "Monday",
          time: "10:00",
          movie: movie_1.id
        },
        {
          day: "Tuesday",
          time: "10:00",
          movie: movie_2.id
        },
        {
          day: "Friday",
          time: "10:00",
          movie: movie_3.id
        }
      ]
    };

    const result1 = await graphQLHelper(
      CREATE_CINEMA,
      { input: cinemaIn },
      {
        user: {
          ...register,
          id: register.id,
          role: Role.Admin,
          authToken: register.authToken
        }
      }
    );

    const { createCinema } = result1.data as { createCinema: Cinema };

    expect(createCinema).toMatchObject({
      ...cinema1,
      schedule: [
        {
          day: "Monday",
          time: "10:00",
          movie: movie1
        },
        {
          day: "Tuesday",
          time: "10:00",
          movie: movie2
        },
        {
          day: "Friday",
          time: "10:00",
          movie: movie3
        }
      ],
      movies: [movie1, movie2, movie3]
    });

    // check cinema is created in database
    const cinemaDB = await CinemaModel.findById(createCinema.id);
    expect(cinemaDB).toMatchObject(cinema1);

    // clean database
    await CinemaModel.deleteMany({});
    await UserModel.deleteMany({});
    await MovieModel.deleteMany({});
  });

  it("should not create a cinema if user is not admin", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    const result1 = await graphQLHelper(
      CREATE_CINEMA,
      { input: cinema1 },
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

    // check cinema is not created in database
    const cinemaDB = await CinemaModel.findOne({ name: cinema1.name });
    expect(cinemaDB).toBeNull();

    // clean database
    await UserModel.deleteMany({});
    await CinemaModel.deleteMany({});
  });

  it("should not create a cinema if schedule movie does not exists", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    await UserModel.findByIdAndUpdate(register.id, { role: Role.Admin });

    const movie_1 = new MovieModel(movie1);
    await movie_1.save();
    const movie_2 = new MovieModel(movie2);
    await movie_2.save();
    const movie_3 = new MovieModel(movie3);
    await movie_3.save();

    const id = new ObjectId();
    const cinemaIn = {
      ...cinema1,
      schedule: [
        {
          day: "Monday",
          time: "10:00",
          movie: movie_2._id.toString()
        },
        {
          day: "Tuesday",
          time: "10:00",
          movie: id.toString()
        },
        {
          day: "Friday",
          time: "10:00",
          movie: movie_3._id.toString()
        },
        {
          day: "Friday",
          time: "10:00",
          movie: movie_1._id.toString()
        }
      ]
    };

    const result1 = await graphQLHelper(
      CREATE_CINEMA,
      { input: cinemaIn },
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

    // check cinema is not created in database
    const cinemaDB = await CinemaModel.findOne({ name: cinema1.name });
    expect(cinemaDB).toBeNull();

    // clean database
    await UserModel.deleteMany({});
    await CinemaModel.deleteMany({});
  });

  it("should not create a cinema if movie already exists", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create cinema in database
    const cinema = new CinemaModel(cinema1);
    await cinema.save();

    const result1 = await graphQLHelper(
      CREATE_CINEMA,
      { input: cinema1 },
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
      ERROR.CINEMA_ALREADY_EXISTS.message
    );

    // check cinema is not created in database
    const cinemaDB = await CinemaModel.find({ name: cinema1.name });
    expect(cinemaDB.length).toBe(1);

    // clean database
    await UserModel.deleteMany({});
    await CinemaModel.deleteMany({});
  });
});
