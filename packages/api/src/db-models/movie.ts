import mongoose, { Schema, Model, model, ObjectId } from "mongoose";
import { Movie } from "../gql/types";
import moment from "moment";
import { ERROR } from "../errors";

mongoose.set("strictQuery", false);

const MovieSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    synopsis: { type: String, required: true },
    gender: { type: String, required: true },
    duration: { type: Number, required: true },
    director: { type: String, required: true },
    cast: { type: [String], required: true },
    release: { type: Date, required: true },
    rating: {
      type: Number,
      enum: {
        values: [1, 2, 3, 4, 5]
      },
      required: true
    },
    image: { type: String, default: "" },
    trailer: { type: String, default: "" }
  },
  { timestamps: true }
);

const validateMovie = async (release, duration, trailer) => {
  if (release && !moment(release).isValid()) {
    throw new Error(ERROR.INVALID_DATE.message);
  }

  if (duration && duration < 0) {
    throw new Error(ERROR.INVALID_DURATION.message);
  }

  if (trailer) {
    const regex = new RegExp(/^[a-zA-Z0-9-_]{11}$/);
    if (!regex.test(trailer)) {
      throw new Error(ERROR.INVALID_VIDEO_ID.message);
    }
  }
};

MovieSchema.pre("validate", async function (next) {
  const existingMovie = await this.model
    .findOne({
      title: this.title
    })
    .exec();

  if (existingMovie) {
    throw new Error(ERROR.MOVIE_ALREADY_EXISTS.message);
  }

  await validateMovie(
    this.release || null,
    this.duration || null,
    this.trailer || null
  );

  next();
});

MovieSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const update: MovieModelType | null =
    this.getUpdate() as MovieModelType | null;

  if (!update) {
    next();
    return;
  }

  const movie = {
    title: update.title || query.title,
    release: update.release || query.release,
    duration: update.duration || query.duration,
    trailer: update.trailer || query.trailer
  };
  //check if movie to update exists
  const exists = await this.model.findOne({ _id: query._id }).exec();
  if (!exists) {
    throw new Error(ERROR.MOVIE_NOT_FOUND.message);
  }

  if (movie.title) {
    const existingMovie = await this.model
      .findOne({
        title: movie.title,
        _id: { $ne: exists._id }
      })
      .exec();

    if (existingMovie) {
      throw new Error(ERROR.MOVIE_ALREADY_EXISTS.message);
    }
  }

  await validateMovie(movie.release, movie.duration, movie.trailer);

  return next();
});

// MovieSchema.post("remove", async function (doc,next){
//   //TODO: delete movie from cinemas
//   try{
//     await CinemaModel.updateMany(
//       { "schedule.movie": doc._id },
//       { $pull: { schedule: { movie: doc._id } } }
//     );
//   }catch(e){
//     throw new Error(ERROR.MOVIE_NOT_DELETED.message);
//   }
//   next();
// });

export type MovieModelType = Movie & {
  _id: ObjectId;
};

export const MovieModel: Model<MovieModelType> = model<MovieModelType>(
  "Movie",
  MovieSchema
);
