import mongoose, { Schema, Model, model, ObjectId } from "mongoose";
import { Role, User } from "../gql/types";

mongoose.set("strictQuery", false);

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    password: { type: String, required: true },
    role: { type: String, default: Role.User },
    authToken: { type: String, default: "" }
  },
  { timestamps: true }
);

export type UserModelType = User & {
  _id: ObjectId;
};

export const UserModel: Model<UserModelType> = model<UserModelType>(
  "User",
  UserSchema
);
