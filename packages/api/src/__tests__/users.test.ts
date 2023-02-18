import { Mongoose } from "mongoose";
import { UserModel } from "../db-models/user";
import { ERROR } from "../errors";
import { Role, User } from "../gql/types";
import { user, user2, user3 } from "./data/user";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { REGISTER, USERS } from "./queries";

let db: Mongoose;

beforeAll(async () => {
  const result = await BeforeAll(db);
  db = result;
});

afterAll(async () => {
  const result = await AfterAll(db);
  db = result;
});

describe("Users", () => {
  it("should return all users", async () => {
    // create users in database
    const result1 = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result1.data as { register: User };

    const result2 = await graphQLHelper(
      REGISTER,
      { input: user2 },
      { user: undefined }
    );
    const { register: register2 } = result2.data as { register: User };
    await UserModel.findByIdAndUpdate(
      register2.id,
      { role: "ADMIN" },
      { new: true }
    );
    const register2Admin = {
      ...register2,
      role: Role.Admin
    };
    const result3 = await graphQLHelper(
      REGISTER,
      { input: user3 },
      { user: undefined }
    );
    const { register: register3 } = result3.data as { register: User };

    // get users
    const resultUsers = await graphQLHelper(
      USERS,
      {},
      { user: register2Admin }
    );
    const { users } = resultUsers.data as { users: User[] };

    expect(users).toHaveLength(3);
    expect(users).toMatchObject([register, register2Admin, register3]);

    // clean database
    await UserModel.deleteMany({});
  });

  it("should not return all users if user is not admin", async () => {
    // create users in database
    const result1 = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result1.data as { register: User };

    await graphQLHelper(REGISTER, { input: user2 }, { user: undefined });

    await graphQLHelper(REGISTER, { input: user3 }, { user: undefined });

    // get users
    const result = await graphQLHelper(USERS, {}, { user: register });

    // check error response
    expect((result as any)?.errors[0].message).toMatch(
      ERROR.ROLE_NEEDED.message
    );

    // clean database
    await UserModel.deleteMany({});
  });

  it("should return error if user is not logged in", async () => {
    // create users in database
    await graphQLHelper(REGISTER, { input: user }, { user: undefined });

    await graphQLHelper(REGISTER, { input: user2 }, { user: undefined });

    await graphQLHelper(REGISTER, { input: user3 }, { user: undefined });

    // get users
    const result = await graphQLHelper(USERS, {}, { user: undefined });

    // check error response
    expect((result as any)?.errors[0].message).toMatch(
      ERROR.LOGIN_NEEDED.message
    );

    // clean database
    await UserModel.deleteMany({});
  });
});
