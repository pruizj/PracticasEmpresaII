import { Mongoose } from "mongoose";
import { UserModel } from "../db-models/user";
import { ERROR } from "../errors";
import { Role, User } from "../gql/types";
import { user, user2 } from "./data/user";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { CHANGE_ROLE, REGISTER } from "./queries";
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

describe("Change Role", () => {
  it("should change role to user to a user", async () => {
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

    const result2 = await graphQLHelper(
      REGISTER,
      { input: user2 },
      { user: undefined }
    );
    const { register: register2 } = result2.data as { register: User };
    await UserModel.findByIdAndUpdate(register2.id, { role: "ADMIN" });

    // give USER role to user2
    const result3 = await graphQLHelper(
      CHANGE_ROLE,
      { changeRoleId: register2.id, role: Role.User },
      { user: updateUser }
    );
    const { changeRole } = result3.data as { changeRole: User };
    const adminUser = {
      ...register2,
      role: "USER"
    };
    expect(changeRole).toMatchObject(adminUser);

    // check user is updated in database
    const user2DBUpdated = await UserModel.findById(register2.id);
    expect(user2DBUpdated).toMatchObject(adminUser);

    // clean database
    await UserModel.deleteMany({});
  });

  it("should change role to admin to a user", async () => {
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

    const result2 = await graphQLHelper(
      REGISTER,
      { input: user2 },
      { user: undefined }
    );
    const { register: register2 } = result2.data as { register: User };

    // give ADMIN role to user2
    const result3 = await graphQLHelper(
      CHANGE_ROLE,
      { changeRoleId: register2.id, role: Role.Admin },
      { user: updateUser }
    );

    const { changeRole } = result3.data as { changeRole: User };
    const adminUser = {
      ...register2,
      role: "ADMIN"
    };
    expect(changeRole).toMatchObject(adminUser);

    // check user is updated in database
    const user2DBUpdated = await UserModel.findById(register2.id);
    expect(user2DBUpdated).toMatchObject(adminUser);

    // clean database
    await UserModel.deleteMany({});
  });

  it("should not change role to a user if user is not logged in", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // give admin role to user2
    const result3 = await graphQLHelper(
      CHANGE_ROLE,
      { changeRoleId: register.id, role: Role.Admin },
      { user: undefined }
    );

    // check error response
    expect((result3 as any)?.errors[0].message).toMatch(
      ERROR.LOGIN_NEEDED.message
    );

    // check user is not updated in database
    const user2DBUpdated = await UserModel.findById(register.id);
    expect(user2DBUpdated).toMatchObject(register);

    // clean database
    await UserModel.deleteMany({});
  });

  it("should not change role to a user if user is not admin", async () => {
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

    // give admin role to user2
    const result3 = await graphQLHelper(
      CHANGE_ROLE,
      { changeRoleId: register2.id, role: Role.Admin },
      { user: register }
    );

    // check error response
    expect((result3 as any)?.errors[0].message).toMatch(
      ERROR.ROLE_NEEDED.message
    );

    // check user is not updated in database
    const user2DBUpdated = await UserModel.findById(register2.id);
    expect(user2DBUpdated).toMatchObject(register2);

    // clean database
    await UserModel.deleteMany({});
  });

  it("should not change role to a user if user does not exist", async () => {
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

    // give admin role to user2
    const result3 = await graphQLHelper(
      CHANGE_ROLE,
      { changeRoleId: id.toString(), role: Role.User },
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
