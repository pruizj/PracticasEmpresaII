import { ObjectId } from "mongoose";
import { CinemaModel, CinemaModelType } from "../db-models/cinema";
import { MovieModel } from "../db-models/movie";
import { ERROR } from "../errors";
import {
  Movie,
  MutationCreateCinemaArgs,
  MutationDeleteCinemaArgs,
  MutationUpdateCinemaArgs,
  PaginatedCinemas,
  QueryCinemaArgs,
  QueryPaginatedCinemasArgs,
  Schedule
} from "../gql/types";
import { paginator } from "../lib/paginatedFilters";

export const cinemaResolver = {
  Query: {
    cinema: async (
      _parent: unknown,
      args: QueryCinemaArgs
    ): Promise<Omit<CinemaModelType, "_id">> => {
      const cinema = await CinemaModel.findById(args.id).exec();
      if (!cinema) {
        throw new Error(ERROR.CINEMA_NOT_FOUND.message);
      }
      return cinema;
    },

    cinemas: async (): Promise<Omit<CinemaModelType, "_id">[]> => {
      const cinemas = await CinemaModel.find().exec();
      return cinemas;
    },

    paginatedCinemas: async (
      _parent: unknown,
      args: QueryPaginatedCinemasArgs
    ): Promise<PaginatedCinemas> => {
      const filter = {
        name: { $regex: `.*${args.searchName || ""}.*`, $options: "i" }
      };

      const cinemas: PaginatedCinemas = await paginator(
        CinemaModel,
        "cinemas",
        filter,
        args.page,
        args.pageSize,
        args.order?.toString()
      );

      return cinemas;
    }
  },
  Mutation: {
    createCinema: async (
      _parent: unknown,
      args: MutationCreateCinemaArgs
    ): Promise<Omit<CinemaModelType, "_id">> => {
      const schedule =
        args.input.schedule && args.input.schedule.length > 0
          ? args.input.schedule.map(schedule => {
              return {
                day: schedule.day,
                time: schedule.time,
                room: schedule.room,
                capacity: args.input.capacity,
                movie: schedule.movie
              };
            })
          : [];
      return await CinemaModel.create({ ...args.input, schedule });
    },

    updateCinema: async (
      _parent: unknown,
      args: MutationUpdateCinemaArgs
    ): Promise<Omit<CinemaModelType, "_id">> => {
      const cinema = await CinemaModel.findById(args.id).exec();
      if (!cinema) {
        throw new Error(ERROR.CINEMA_NOT_FOUND.message);
      }

      const schedule = args.input.schedule
        ? args.input.schedule.length > 0
          ? args.input.schedule.map(schedule => {
              return {
                day: schedule.day,
                time: schedule.time,
                room: schedule.room,
                capacity: args.input.capacity || cinema.capacity,
                movie: schedule.movie
              };
            })
          : []
        : cinema.schedule;
      console.log("updated", schedule);
      return (await CinemaModel.findByIdAndUpdate(
        args.id,
        { ...args.input, schedule },
        { new: true }
      ).exec()) as Omit<CinemaModelType, "_id">;
    },

    deleteCinema: async (
      _parent: unknown,
      args: MutationDeleteCinemaArgs
    ): Promise<Omit<CinemaModelType, "_id">> => {
      const cinema = await CinemaModel.findByIdAndDelete(args.id).exec();
      if (!cinema) {
        throw new Error(ERROR.CINEMA_NOT_FOUND.message);
      }
      return cinema;
    }
  },
  Cinema: {
    movies: async (parent: CinemaModelType): Promise<Movie[]> => {
      const idmovies = parent.schedule.map(schedule => schedule.movie);
      return await MovieModel.find({ _id: { $in: idmovies } }).exec();
    },
    schedule: async (parent: CinemaModelType): Promise<Schedule[]> => {
      const idmovies = parent.schedule.map(schedule => schedule.movie);
      const movies = await MovieModel.find({ _id: { $in: idmovies } }).exec();
      const newSchedule = parent.schedule.map(schedule => {
        const movie = movies.find(
          movie => movie._id.toString() === schedule.movie.toString()
        );
        return {
          day: schedule.day,
          time: schedule.time,
          room: schedule.room,
          capacity: schedule.capacity,
          movie: movie as Movie
        };
      });
      return newSchedule;
    }
  }
};
