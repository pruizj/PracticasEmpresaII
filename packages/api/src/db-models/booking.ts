import mongoose, { Schema, Model, model, ObjectId, Types } from "mongoose";
import { Booking } from "../gql/types";

const BookingSchema: Schema = new Schema(
  {
    cinema: { type: Types.ObjectId, ref: "CinemaModel", required: true },
    movie: { type: Types.ObjectId, ref: "MovieModel", required: true },
    day: { type: String, required: true },
    room: { type: Number, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    user: { type: Types.ObjectId, ref: "UserModel", required: true },
    cardNumber: { type: String, required: true },
    expiry_date: { type: Date, required: true },
    security_code: { type: String, required: true }
  },
  { timestamps: true }
);

export type BookingModelType = Booking & {
  _id: ObjectId;
};

export const BookingModel: Model<BookingModelType> = model<BookingModelType>(
  "Booking",
  BookingSchema
);
