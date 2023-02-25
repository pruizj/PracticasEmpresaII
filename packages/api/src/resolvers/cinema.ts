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
  Schedule,
  ScheduleIn
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
        name: { $regex: args.searchName, $options: "i" }
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
      const cinema = await CinemaModel.create(args.input);
      return cinema;
    },

    updateCinema: async (
      _parent: unknown,
      args: MutationUpdateCinemaArgs
    ): Promise<Omit<CinemaModelType, "_id">> => {
      const cinema = (await CinemaModel.findByIdAndUpdate(args.id, args.input, {
        new: true
      }).exec()) as Omit<CinemaModelType, "_id">;
      return cinema;
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
      return parent.schedule.map(schedule => {
        const movie = movies.find(
          movie => movie._id.toString() === schedule.movie.toString()
        );
        return {
          day: schedule.day,
          time: schedule.time,
          movie: movie as Movie
        };
      });
    }
  }
};
