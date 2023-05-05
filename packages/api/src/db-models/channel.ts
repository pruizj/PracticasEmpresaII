import mongoose, { Model, ObjectId, Schema, Types, model } from "mongoose";
import { Channel } from "../gql/types";

mongoose.set("strictQuery", false);

const ChannelSchema: Schema = new Schema({
  name: { type: String, required: true },
  participants: [{ type: Types.ObjectId, ref: "UserModel", default: [] }],
  messages: [{ type: Types.ObjectId, ref: "MessageModel", default: [] }]
});

export type ChannelModelType = Channel & {
  _id: ObjectId;
  participants: ObjectId[];
  messages: ObjectId[];
};

export const ChannelModel: Model<ChannelModelType> = model<ChannelModelType>(
  "Channel",
  ChannelSchema
);
