import { Mongoose } from "mongoose";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { REGISTER } from "./queries";
import { user, user2 } from "./data/user";
import { JoinResult, User } from "../gql/types";
import { ChannelModel } from "../db-models/channel";
import { ObjectId } from "bson";
import { JOIN } from "./queries";
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

describe("join", () => {
  it("should return channel and user that joined", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    const result1 = await graphQLHelper(
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
    const { join } = result1.data as { join: JoinResult };

    expect(join).toMatchObject({
      channel: {
        name: "Channel1",
        participants: [
          {
            name: user.name
          }
        ],
        messages: []
      },
      user: {
        name: user.name,
        email: user.email,
        id: register.id,
        authToken: register?.authToken,
        role: register?.role
      }
    });

    // check if channel is created in database
    const channel = await ChannelModel.findOne({ name: "Channel1" });
    expect(channel).toMatchObject({
      name: "Channel1",
      participants: [new ObjectId(register.id)],
      messages: []
    });

    // clean database
    await ChannelModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("join two users to the same channel", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    const result1 = await graphQLHelper(
      REGISTER,
      { input: user2 },
      { user: undefined }
    );
    const { register: register1 } = result1.data as { register: User };

    const result2 = await graphQLHelper(
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
    const { join } = result2.data as { join: JoinResult };

    const result3 = await graphQLHelper(
      JOIN,
      { channelName: "Channel1" },
      {
        user: {
          ...user2,
          id: register1.id,
          authToken: register1?.authToken,
          role: register1?.role
        }
      }
    );
    const { join: join1 } = result3.data as { join: JoinResult };

    expect(join).toMatchObject({
      channel: {
        name: "Channel1",
        participants: [
          {
            name: user.name
          }
        ],
        messages: []
      },
      user: {
        name: user.name,
        email: user.email,
        id: register.id,
        authToken: register?.authToken,
        role: register?.role
      }
    });

    expect(join1).toMatchObject({
      channel: {
        name: "Channel1",
        participants: [
          {
            name: user.name
          },
          {
            name: user2.name
          }
        ],
        messages: []
      },
      user: {
        name: user2.name,
        email: user2.email,
        id: register1.id,
        authToken: register1?.authToken,
        role: register1?.role
      }
    });

    // check if channel is created in database
    const channel = await ChannelModel.find({ name: "Channel1" });
    expect(channel).toHaveLength(1);
    expect(channel[0]).toMatchObject({
      name: "Channel1",
      participants: [new ObjectId(register.id), new ObjectId(register1.id)],
      messages: []
    });

    // clean database
    await ChannelModel.deleteMany({});
    await UserModel.deleteMany({});
  });
});
