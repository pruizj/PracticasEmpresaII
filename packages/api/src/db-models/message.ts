import mongoose, { Model, ObjectId, Schema, Types, model } from "mongoose";
import { Message } from "../gql/types";

mongoose.set("strictQuery", false);

const MessageSchema: Schema = new Schema({
  text: { type: String, required: true },
  createdBy: { type: Types.ObjectId, ref: "UserModel" }
});

export type MessageModelType = Message & {
  _id: ObjectId;
} & Omit<Message, "channel">;

export const MessageModel: Model<MessageModelType> = model<MessageModelType>(
  "Message",
  MessageSchema
);
