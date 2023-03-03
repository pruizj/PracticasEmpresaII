import { Mongoose } from "mongoose";
import { CinemaModel } from "../db-models/cinema";
import { UserModel } from "../db-models/user";
import { Cinema, User } from "../gql/types";
import { cinema1 } from "./data/cinema";
import { user } from "./data/user";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { CINEMA, REGISTER } from "./queries";
import { ObjectId } from "bson";
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

describe("Cinema", () => {
  it("should return cinema", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create cinema in database
    const newCinema = new CinemaModel(cinema1);
    await newCinema.save();

    // get cinema
    const result2 = await graphQLHelper(
      CINEMA,
      { cinemaId: newCinema.id },
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const { cinema } = result2.data as { cinema: Cinema };

    expect(cinema).toMatchObject({
      ...cinema1,
      id: newCinema._id.toString()
    });

    // clean database
    await UserModel.findByIdAndDelete(register.id);
    await CinemaModel.findByIdAndDelete(newCinema.id);
  });

  it("should return error if cinema is not found", async () => {
    const id = new ObjectId();

    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // get cinema
    const result2 = await graphQLHelper(
      CINEMA,
      { cinemaId: id.toString() },
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
    expect((result2 as any)?.errors[0].message).toMatch(
      ERROR.CINEMA_NOT_FOUND.message
    );

    // clean database
    await UserModel.deleteMany({});
    await CinemaModel.deleteMany({});
  });
});
