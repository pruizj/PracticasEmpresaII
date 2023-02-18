import { Mongoose } from "mongoose";
import { UserModel } from "../db-models/user";
import { User } from "../gql/types";
import { user } from "./data/user";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { LOGIN, REGISTER } from "./queries";
import bcrypt from "bcrypt";
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

describe("Login", () => {
  it("should login a user", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    const result1 = await graphQLHelper(
      LOGIN,
      { email: register.email, password: user.password },
      { user: undefined }
    );

    const { login } = result1.data as { login: User };

    // check user is in database
    const userDB = await UserModel.findOne({ email: user.email });
    expect(userDB).toMatchObject({
      ...user,
      password: expect.any(String),
      role: "USER",
      authToken: login
    });

    // check password is valid
    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      userDB?.password || ""
    );
    expect(isPasswordCorrect).toBe(true);

    // clean database
    await UserModel.deleteMany({});
  });

  it("should not login a user with an invalid email", async () => {
    // create user in database
    const userDB = new UserModel(user);
    await userDB.save();

    const result = await graphQLHelper(
      LOGIN,
      { email: "invalid", password: user.password },
      { user: undefined }
    );

    // check error response
    expect((result as any)?.errors[0].message).toMatch(
      ERROR.INVALID_USER_OR_PASSWORD.message
    );
    expect((result as any)?.errors[0].extensions.code).toMatch(
      ERROR.INVALID_USER_OR_PASSWORD.code
    );

    // check auth token is not in database
    const userDatabase = await UserModel.findOne({ email: user.email });
    expect(userDatabase?.authToken).toBe("");

    // clean database
    await UserModel.deleteMany({});
  });

  it("should not login a user with an invalid password", async () => {
    // create user in database
    const userDB = new UserModel(user);
    await userDB.save();

    const result = await graphQLHelper(
      LOGIN,
      { email: user.email, password: "invalid" },
      { user: undefined }
    );

    // check error response
    expect((result as any)?.errors[0].message).toMatch(
      ERROR.INVALID_USER_OR_PASSWORD.message
    );
    expect((result as any)?.errors[0].extensions.code).toMatch(
      ERROR.INVALID_USER_OR_PASSWORD.code
    );

    // check auth token is not in database
    const userDatabase = await UserModel.findOne({ email: user.email });
    expect(userDatabase?.authToken).toBe("");

    // clean database
    await UserModel.deleteMany({});
  });

  it("should not login a user with an invalid email and password", async () => {
    // create user in database
    const userDB = new UserModel(user);
    await userDB.save();

    const result = await graphQLHelper(
      LOGIN,
      { email: "invalid", password: "invalid" },
      { user: undefined }
    );

    // check error response
    expect((result as any)?.errors[0].message).toMatch(
      ERROR.INVALID_USER_OR_PASSWORD.message
    );
    expect((result as any)?.errors[0].extensions.code).toMatch(
      ERROR.INVALID_USER_OR_PASSWORD.code
    );

    // check auth token is not in database
    const userDatabase = await UserModel.findOne({ email: user.email });
    expect(userDatabase?.authToken).toBe("");

    // clean database
    await UserModel.deleteMany({});
  });
});
