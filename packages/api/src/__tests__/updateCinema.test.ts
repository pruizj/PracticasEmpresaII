import { Mongoose } from "mongoose";
import { CinemaModel } from "../db-models/cinema";
import { MovieModel } from "../db-models/movie";
import { UserModel } from "../db-models/user";
import { ERROR } from "../errors";
import { Cinema, Role, User } from "../gql/types";
import { cinema1, cinema2 } from "./data/cinema";
import { movie1, movie2, movie3 } from "./data/movie";
import { user } from "./data/user";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { REGISTER, UPDATE_CINEMA } from "./queries";
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

describe("updateCinema", () => {
  it("should update a cinema", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create movies in database
    const movie_1 = new MovieModel(movie1);
    await movie_1.save();
    const movie_2 = new MovieModel(movie2);
    await movie_2.save();
    const movie_3 = new MovieModel(movie3);
    await movie_3.save();

    // create cinema in database
    const cinema = new CinemaModel({
      ...cinema1,
      schedule: [
        {
          day: "Monday",
          time: "10:00",
          movie: movie_1._id.toString()
        },
        {
          day: "Tuesday",
          time: "10:00",
          movie: movie_2._id.toString()
        },
        {
          day: "Wednesday",
          time: "10:00",
          movie: movie_3._id.toString()
        }
      ]
    });
    await cinema.save();

    // update cinema
    const result1 = await graphQLHelper(
      UPDATE_CINEMA,
      {
        updateCinemaId: cinema.id,
        input: {
          name: "Cinema 2",
          address: "Address 2",
          schedule: [
            {
              day: "Monday",
              time: "10:00",
              movie: movie_3._id.toString()
            }
          ]
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
    const { updateCinema } = result1.data as { updateCinema: Cinema };

    expect(updateCinema).toMatchObject({
      name: "Cinema 2",
      address: "Address 2",
      schedule: [
        {
          day: "Monday",
          time: "10:00",
          movie: movie3
        }
      ],
      movies: [movie3]
    });

    // check cinema is updated in database
    const cinemaDB = await CinemaModel.findOne({ name: "Cinema 2" });
    expect(cinemaDB).toMatchObject({
      name: "Cinema 2",
      address: "Address 2",
      schedule: [
        {
          day: "Monday",
          time: "10:00",
          movie: movie_3._id
        }
      ]
    });

    // clean database
    await MovieModel.deleteMany({});
    await CinemaModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should not update a cinema if user is not admin", async () => {
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

    // update cinema
    const result1 = await graphQLHelper(
      UPDATE_CINEMA,
      {
        updateCinemaId: cinema.id,
        input: {
          address: "Address 2"
        }
      },
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

    // check cinema is not updated in database
    const cinemaDB = await CinemaModel.findOne({ name: cinema1.name });
    expect(cinemaDB).toMatchObject(cinema1);

    // clean database
    await CinemaModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should not update a cinema if cinema does not exist", async () => {
    const id = new ObjectId();
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // update cinema
    const result1 = await graphQLHelper(
      UPDATE_CINEMA,
      {
        updateCinemaId: id.toString(),
        input: {
          address: "Address 2"
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
      ERROR.CINEMA_NOT_FOUND.message
    );

    // clean database
    await UserModel.deleteMany({});
    await CinemaModel.deleteMany({});
  });

  it("should not update a cienma if the name is already taken", async () => {
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

    // create cinema in database
    const cinema_2 = new CinemaModel(cinema2);
    await cinema_2.save();

    // update cinema
    const result1 = await graphQLHelper(
      UPDATE_CINEMA,
      {
        updateCinemaId: cinema.id,
        input: {
          name: cinema2.name
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
      ERROR.CINEMA_ALREADY_EXISTS.message
    );

    // check cinema is not updated in database
    const cinemaDB = await CinemaModel.findOne({ name: cinema1.name });
    expect(cinemaDB).toMatchObject(cinema1);

    // clean database
    await CinemaModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should not update a cinema if the schedule have invalid movies", async () => {
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

    const id = new ObjectId();
    // update cinema
    const result1 = await graphQLHelper(
      UPDATE_CINEMA,
      {
        updateCinemaId: cinema.id,
        input: {
          schedule: [
            {
              day: "Monday",
              time: "10:00",
              movie: id.toString()
            }
          ]
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
      ERROR.MOVIE_NOT_FOUND.message
    );

    // check cinema is not updated in database
    const cinemaDB = await CinemaModel.findOne({ name: cinema1.name });
    expect(cinemaDB).toMatchObject(cinema1);

    // clean database
    await CinemaModel.deleteMany({});
    await UserModel.deleteMany({});
  });
});
