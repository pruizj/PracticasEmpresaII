import { Mongoose } from "mongoose";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { user } from "./data/user";
import { REGISTER } from "./queries";
import { User } from "../gql/types";
import { UserModel } from "../db-models/user";
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

describe("Register", () => {
  it("should register a new user", async () => {
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };
    const resultUser = {
      ...user,
      password: register.password,
      role: "USER",
      authToken: ""
    };
    expect(register).toMatchObject(resultUser);

    // check user is in database
    const userDB = await UserModel.findById(register.id);
    expect(userDB).toMatchObject(resultUser);

    // clean database
    await UserModel.deleteMany({});
  });

  it("should not register a new user with an existing email", async () => {
    // create user in database
    const userDB = new UserModel(user);
    await userDB.save();

    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );

    // check error response
    expect((result as any)?.errors[0].message).toMatch(
      ERROR.USER_ALREADY_EXISTS.message
    );
    expect((result as any)?.errors[0].extensions.code).toMatch(
      ERROR.USER_ALREADY_EXISTS.code
    );

    // check user is in datbase only once
    const usersDB = await UserModel.find();
    expect(usersDB.length).toBe(1);

    // clean database
    await UserModel.deleteMany({});
  });

  it("should not register a new user with a weak password", async () => {
    const userWeakPassword = {
      ...user,
      password: "1234"
    };

    const result = await graphQLHelper(
      REGISTER,
      { input: userWeakPassword },
      { user: undefined }
    );

    // check error response
    expect((result as any)?.errors[0].message).toMatch(
      ERROR.PASSWORD_NOT_SECURE.message
    );
    expect((result as any)?.errors[0].extensions.code).toMatch(
      ERROR.PASSWORD_NOT_SECURE.code
    );

    // check user is not in database
    const usersDB = await UserModel.find();
    expect(usersDB.length).toBe(0);
  });
});
