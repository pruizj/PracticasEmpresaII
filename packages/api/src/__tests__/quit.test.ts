import { Mongoose } from "mongoose";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { JOIN, QUIT, REGISTER } from "./queries";
import { user, user2 } from "./data/user";
import { Channel, User } from "../gql/types";
import { ERROR } from "../errors";
import { ChannelModel } from "../db-models/channel";
import { UserModel } from "../db-models/user";

let db: Mongoose;

beforeAll(async () => {
  const result = await BeforeAll(db);
  db = result;
});

afterAll(async () => {
  const result = await AfterAll(db);
  db = result;
});

describe("quit", () => {
  it("should quit from channel", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    await graphQLHelper(
      JOIN,
      { channelName: "Channel1" },
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const result2 = await graphQLHelper(
      QUIT,
      { channelName: "Channel1" },
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );
    const { quit } = result2.data as { quit: Channel };

    expect(quit).toMatchObject({
      id: expect.any(String),
      name: "Channel1",
      participants: [],
      messages: []
    });

    // check is not in database
    const channel = await ChannelModel.findOne({ name: "Channel1" });
    expect(channel).toBeNull();

    // clean database
    await ChannelModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should throw an error if user is not in channel", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    const result3 = await graphQLHelper(
      REGISTER,
      { input: user2 },
      { user: undefined }
    );
    const { register: register2 } = result3.data as { register: User };

    await graphQLHelper(
      JOIN,
      { channelName: "Channel1" },
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const result2 = await graphQLHelper(
      QUIT,
      { channelName: "Channel1" },
      {
        user: {
          ...user2,
          id: register2.id,
          authToken: register2?.authToken,
          role: register2?.role
        }
      }
    );

    // check error response
    expect((result2 as any)?.errors[0].message).toMatch(
      ERROR.CHANNEL_NOT_FOUND.message
    );

    // clean database
    await ChannelModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should throw an error if channel does not exist", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    const result2 = await graphQLHelper(
      QUIT,
      { channelName: "Channel1" },
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
      ERROR.CHANNEL_NOT_FOUND.message
    );

    // clean database
    await ChannelModel.deleteMany({});
    await UserModel.deleteMany({});
  });
});
