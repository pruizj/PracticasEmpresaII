import { Mongoose } from "mongoose";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { JOIN, REGISTER, SEND_MESSAGE } from "./queries";
import { user, user2 } from "./data/user";
import { JoinResult, Message, User } from "../gql/types";
import { MessageModel } from "../db-models/message";
import { ChannelModel } from "../db-models/channel";
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

describe("sendMessage", () => {
  it("send message", async () => {
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

    const result2 = await graphQLHelper(
      SEND_MESSAGE,
      { channelName: "Channel1", text: "Hello" },
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );
    const { sendMessage } = result2.data as { sendMessage: Message };

    expect(sendMessage).toMatchObject({
      id: expect.any(String),
      text: "Hello",
      createdBy: {
        id: register.id,
        name: register.name,
        surname: register.surname,
        email: register.email,
        password: register.password,
        role: register.role,
        authToken: register?.authToken
      }
    });

    // check if message is saved in database
    const message = await MessageModel.findOne({ _id: sendMessage.id });
    expect(message?.text).toBe("Hello");

    const channel = await ChannelModel.findOne({ name: "Channel1" });
    expect(channel?.name).toBe("Channel1");
    expect(channel?.messages).toHaveLength(1);
    expect(channel?.participants).toHaveLength(1);

    // clean database
    await ChannelModel.deleteMany({});
    await MessageModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("send a message to a channel that does not exist", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    const result1 = await graphQLHelper(
      SEND_MESSAGE,
      { channelName: "Channel1", text: "Hello" },
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
    expect((result1 as any)?.errors[0].message).toMatch(
      ERROR.CHANNEL_NOT_FOUND.message
    );

    // clean database
    await ChannelModel.deleteMany({});
    await MessageModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("send a message to a channel that user is not a participant of", async () => {
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
      REGISTER,
      { input: user2 },
      { user: undefined }
    );
    const { register: register2 } = result2.data as { register: User };

    const result3 = await graphQLHelper(
      SEND_MESSAGE,
      { channelName: "Channel1", text: "Hello" },
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
    expect((result3 as any)?.errors[0].message).toMatch(
      ERROR.CHANNEL_NOT_FOUND.message
    );

    // clean database
    await ChannelModel.deleteMany({});
    await MessageModel.deleteMany({});
    await UserModel.deleteMany({});
  });
});
