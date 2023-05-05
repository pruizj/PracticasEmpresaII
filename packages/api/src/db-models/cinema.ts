import mongoose, { Schema, Model, model, ObjectId, Types } from "mongoose";
import { ERROR } from "../errors";
import { Cinema } from "../gql/types";
import { MovieModel } from "./movie";

mongoose.set("strictQuery", false);

const CinemaSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    rooms: { type: Number, required: true },
    capacity: { type: Number, required: true },
    schedule: [
      {
        day: { type: String, required: true },
        time: { type: String, required: true },
        capacity: { type: Number, required: true },
        room: { type: Number, required: true },
        movie: { type: Types.ObjectId, ref: "MovieModel" }
      }
    ]
  },
  { timestamps: true }
);

CinemaSchema.pre("validate", async function (next) {
  const existingCinema = await CinemaModel.findOne({
    name: this.name
  }).exec();

  if (existingCinema) {
    throw new Error(ERROR.CINEMA_ALREADY_EXISTS.message);
  }

  if (this.rooms < 0 || this.capacity < 0) {
    throw new Error(ERROR.INVALID_NUMBER.message);
  }

  if (this.schedule.length > 0) {
    this.schedule.map(async s => {
      const movie = await MovieModel.count({ _id: s.movie }).exec();
      if (movie === 0) {
        throw new Error(ERROR.MOVIE_NOT_FOUND.message);
      }
    });
  }

  next();
});

CinemaSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const update: CinemaModelType | null =
    this.getUpdate() as CinemaModelType | null;

  if (!update) {
    next();
    return;
  }

  // check if cinema to update exists
  const exists = await CinemaModel.findOne({
    _id: query._id
  }).exec();
  if (!exists) {
    throw new Error(ERROR.CINEMA_NOT_FOUND.message);
  }

  const cinema = {
    name: update?.name || query.name,
    address: update?.address || query.address,
    rooms: update?.rooms || query.rooms,
    capacity: update?.capacity || query.capacity,
    schedule: update?.schedule || query.schedule
  };
  console.log(cinema);
  if (cinema.name) {
    const existingCinema = await CinemaModel.findOne({
      name: cinema.name,
      _id: { $ne: exists._id }
    }).exec();

    if (existingCinema) {
      throw new Error(ERROR.CINEMA_ALREADY_EXISTS.message);
    }
  }

  if (cinema.rooms < 0 || cinema.capacity < 0) {
    throw new Error(ERROR.INVALID_NUMBER.message);
  }

  if (cinema.schedule.length > 0) {
    cinema.schedule.map(async s => {
      const movie = await MovieModel.count({ _id: s.movie }).exec();
      if (movie === 0) {
        throw new Error(ERROR.MOVIE_NOT_FOUND.message);
      }
    });
  }

  next();
});

export type CinemaModelType = Cinema & {
  _id: ObjectId;
};

export const CinemaModel: Model<CinemaModelType> = model<CinemaModelType>(
  "Cinema",
  CinemaSchema
);
