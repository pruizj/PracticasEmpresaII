import { Mongoose } from "mongoose";
import { UserModel } from "../db-models/user";
import { ERROR } from "../errors";
import { Role, User } from "../gql/types";
import { user, user2 } from "./data/user";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { DELETE_USER, REGISTER } from "./queries";
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

describe("Delete User", () => {
  it("should delete a user", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };
    await UserModel.findByIdAndUpdate(register.id, { role: "ADMIN" });
    const updatedUser = {
      ...register,
      role: Role.Admin
    };

    const result2 = await graphQLHelper(
      REGISTER,
      { input: user2 },
      { user: undefined }
    );
    const { register: register2 } = result2.data as { register: User };

    // delete user2
    const result3 = await graphQLHelper(
      DELETE_USER,
      { deleteUserId: register2.id },
      { user: updatedUser }
    );
    const { deleteUser } = result3.data as { deleteUser: User };

    expect(deleteUser).toMatchObject(register2);

    // check user2 is deleted from database
    const deletedUser = await UserModel.findById(register2.id);
    expect(deletedUser).toBeNull();

    // clean database
    await UserModel.deleteMany({});
  });

  it("should not delete a user if user is not admin", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    const result2 = await graphQLHelper(
      REGISTER,
      { input: user2 },
      { user: undefined }
    );
    const { register: register2 } = result2.data as { register: User };

    // delete user2
    const result3 = await graphQLHelper(
      DELETE_USER,
      { deleteUserId: register2.id },
      { user: register }
    );

    // check error response
    expect((result3 as any)?.errors[0].message).toMatch(
      ERROR.ROLE_NEEDED.message
    );

    // check user2 is not deleted from database
    const deletedUser = await UserModel.findById(register2.id);
    expect(deletedUser).toMatchObject(register2);

    // clean database
    await UserModel.deleteMany({});
  });

  it("should not delete a user if user is not logged in", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // delete user2
    const result3 = await graphQLHelper(
      DELETE_USER,
      { deleteUserId: register.id },
      { user: undefined }
    );

    // check error response
    expect((result3 as any)?.errors[0].message).toMatch(
      ERROR.LOGIN_NEEDED.message
    );

    // check user2 is not deleted from database
    const deletedUser = await UserModel.findById(register.id);
    expect(deletedUser).toMatchObject(register);

    // clean database
    await UserModel.deleteMany({});
  });

  it("should not delete a user if user does not exist", async () => {
    const id = new ObjectId();
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };
    await UserModel.findByIdAndUpdate(register.id, { role: "ADMIN" });
    const updateUser = {
      ...register,
      role: Role.Admin
    };

    // delete user2
    const result3 = await graphQLHelper(
      DELETE_USER,
      { deleteUserId: id.toString() },
      { user: updateUser }
    );

    // check error response
    expect((result3 as any)?.errors[0].message).toMatch(
      ERROR.USER_NOT_FOUND.message
    );
    expect((result3 as any)?.errors[0].extensions.code).toMatch(
      ERROR.USER_NOT_FOUND.code
    );

    // clean database
    await UserModel.deleteMany({});
  });
});
