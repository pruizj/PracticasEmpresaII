import { Mongoose } from "mongoose";
import { UserModel } from "../db-models/user";
import { ERROR } from "../errors";
import { Role, User } from "../gql/types";
import { user } from "./data/user";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { ME, REGISTER } from "./queries";
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

describe("Me", () => {
  it("should return user", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // get user
    const result2 = await graphQLHelper(ME, {}, { user: register });
    const { me } = result2.data as { me: User };

    expect(me).toMatchObject(register);

    // clean database
    await UserModel.deleteMany({});
  });

  it("should return error if user is not logged in", async () => {
    // get user
    const result = await graphQLHelper(ME, {}, { user: undefined });

    // check error response
    expect((result as any)?.errors[0].message).toMatch(
      ERROR.LOGIN_NEEDED.message
    );

    // clean database
    await UserModel.deleteMany({});
  });

  it("should return error if user is not found", async () => {
    const id = new ObjectId();
    // get user
    const result = await graphQLHelper(
      ME,
      {},
      {
        user: {
          authToken: "",
          email: user.email,
          id: id.toString(),
          name: user.name,
          password: user.password,
          role: Role.User,
          surname: user.surname
        }
      }
    );

    // check error response
    expect((result as any)?.errors[0].message).toMatch(
      ERROR.USER_NOT_FOUND.message
    );
    expect((result as any)?.errors[0].extensions.code).toMatch(
      ERROR.USER_NOT_FOUND.code
    );

    // clean database
    await UserModel.deleteMany({});
  });
});
