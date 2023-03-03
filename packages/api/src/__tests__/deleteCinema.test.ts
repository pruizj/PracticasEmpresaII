import { Mongoose } from "mongoose";
import { CinemaModel } from "../db-models/cinema";
import { Cinema, Role, User } from "../gql/types";
import { user } from "./data/user";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { DELETE_CINEMA, REGISTER } from "./queries";
import { cinema1 } from "./data/cinema";
import { UserModel } from "../db-models/user";
import { MovieModel } from "../db-models/movie";
import { movie1, movie2, movie3 } from "./data/movie";
import { ERROR } from "../errors";
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

describe("deleteCinema", () => {
  it("should delete a cinema", async () => {
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
          movie: movie_1.id
        },
        {
          day: "Tuesday",
          time: "10:00",
          movie: movie_2.id
        },
        {
          day: "Wednesday",
          time: "10:00",
          movie: movie_3.id
        }
      ]
    });
    await cinema.save();

    // delete cinema
    const result1 = await graphQLHelper(
      DELETE_CINEMA,
      { deleteCinemaId: cinema.id },
      {
        user: {
          ...register,
          id: register.id,
          role: Role.Admin,
          authToken: register.authToken
        }
      }
    );
    const { deleteCinema } = result1.data as { deleteCinema: Cinema };

    expect(deleteCinema).toMatchObject({
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
          day: "Wednesday",
          time: "10:00",
          movie: movie3
        }
      ],
      movies: [movie1, movie2, movie3]
    });

    // check cinema is deleted in database
    const cinemaDB = await CinemaModel.findById(deleteCinema.id);
    expect(cinemaDB).toBeNull();

    // clean database
    await CinemaModel.deleteMany();
    await UserModel.deleteMany();
  });

  it("should not delete a cinema if user is not admin", async () => {
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

    // delete cinema
    const result1 = await graphQLHelper(
      DELETE_CINEMA,
      { deleteCinemaId: cinema.id },
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

    // check cinema is not deleted in database
    const cinemaDB = await CinemaModel.find({ _id: cinema.id });
    expect(cinemaDB).toHaveLength(1);

    // clean database
    await CinemaModel.findByIdAndDelete(cinema.id);
    await UserModel.findByIdAndDelete(register.id);
  });

  it("should not delete a cinema if cinema does not exist", async () => {
    const id = new ObjectId();
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // delete cinema
    const result1 = await graphQLHelper(
      DELETE_CINEMA,
      { deleteCinemaId: id.toString() },
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
    await UserModel.findByIdAndDelete(register.id);
    await CinemaModel.findByIdAndDelete(id);
  });
});
