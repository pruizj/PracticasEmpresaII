import { Mongoose } from "mongoose";
import { AfterAll, BeforeAll } from "./functions";
import { message1, message2 } from "./data/forum";
import { graphQLHelper } from "./graphqlHelper";
import { REGISTER } from "./queries";
import { user } from "./data/user";
import { User } from "../gql/types";
import { ChannelModel } from "../db-models/channel";
import { ObjectId } from "bson";
import { MessageModel } from "../db-models/message";
import { user2 } from "./data/user";

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
      text: message1.text,
      createdBy: new ObjectId(register.id)
    });

    const message_2 = await MessageModel.create({
      text: message2.text,
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
  });
});
