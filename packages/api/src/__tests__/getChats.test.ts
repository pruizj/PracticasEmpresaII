import { Mongoose } from "mongoose";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { GET_CHATS, REGISTER } from "./queries";
import { user } from "./data/user";
import { Channel, User } from "../gql/types";
import { ChannelModel } from "../db-models/channel";
import { ObjectId } from "bson";
import { MessageModel } from "../db-models/message";
import { user2 } from "./data/user";
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

describe("getChats", () => {
  it("should return an array of chats", async () => {
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

    const message_1 = await MessageModel.create({
      text: "Hello 1",
      createdBy: new ObjectId(register.id)
    });

    const message_2 = await MessageModel.create({
      text: "Hello 2",
      createdBy: new ObjectId(register1.id)
    });

    // create channel in database
    const Channel1 = await ChannelModel.create({
      name: "Channel1",
      participants: [new ObjectId(register.id)],
      messages: [new ObjectId(message_1.id)]
    });

    const Channel2 = await ChannelModel.create({
      name: "Channel2",
      participants: [new ObjectId(register1.id)],
      messages: [new ObjectId(message_2.id)]
    });

    const result2 = await graphQLHelper(
      GET_CHATS,
      {},
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const { getChats } = result2.data as { getChats: Channel[] };

    expect(getChats).toMatchObject([
      {
        id: Channel1.id,
        name: "Channel1",
        participants: [
          {
            name: user.name
          }
        ],
        messages: [
          {
            id: message_1.id,
            text: "Hello 1",
            createdBy: {
              name: user.name
            }
          }
        ]
      },
      {
        id: Channel2.id,
        name: "Channel2",
        participants: [
          {
            name: user2.name
          }
        ],
        messages: [
          {
            id: message_2.id,
            text: "Hello 2",
            createdBy: {
              name: user2.name
            }
          }
        ]
      }
    ]);

    // clean database
    await ChannelModel.deleteMany({});
    await MessageModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should return no cinemas if there are no cinemas in database", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    const result1 = await graphQLHelper(
      GET_CHATS,
      {},
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const { getChats } = result1.data as { getChats: Channel[] };

    expect(getChats).toMatchObject([]);

    // clean database
    await ChannelModel.deleteMany({});
    await MessageModel.deleteMany({});
    await UserModel.deleteMany({});
  });
});
