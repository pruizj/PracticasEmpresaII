import { MovieModel, MovieModelType } from "../db-models/movie";
import { ERROR } from "../errors";
import {
  MutationAddRatingToMovieArgs,
  MutationCreateMovieArgs,
  MutationDeleteMovieArgs,
  MutationUpdateMovieArgs,
  PaginatedMovies,
  QueryMovieArgs,
  QueryPaginatedMoviesArgs
} from "../gql/types";
import { paginator } from "../lib/paginatedFilters";

export const movieResolver = {
  Query: {
    movie: async (
      _parent: unknown,
      args: QueryMovieArgs
    ): Promise<Omit<MovieModelType, "_id">> => {
      const movie = await MovieModel.findById(args.id).exec();
      if (!movie) {
        throw new Error(ERROR.MOVIE_NOT_FOUND.message);
      }
      return movie;
    },

    movies: async (): Promise<Omit<MovieModelType, "_id">[]> => {
      const movies = await MovieModel.find().exec();
      return movies;
    },

    paginatedMovies: async (
      _parent: unknown,
      args: QueryPaginatedMoviesArgs
    ): Promise<PaginatedMovies> => {
      const filter = {
        title: { $regex: `.*${args.searchTitle || ""}.*`, $options: "i" }
      };

      const movies: PaginatedMovies = await paginator<MovieModelType>(
        MovieModel,
        "movies",
        filter,
        args.page,
        args.pageSize,
        args.order?.toString()
      );

      return movies;
    }
  },

  Mutation: {
    createMovie: async (
      _parent: unknown,
      args: MutationCreateMovieArgs
    ): Promise<Omit<MovieModelType, "_id">> => {
      const movie = await MovieModel.create(args.input);
      return movie;
    },

    addRatingToMovie: async (
      _parent: unknown,
      args: MutationAddRatingToMovieArgs
    ): Promise<Omit<MovieModelType, "_id">> => {
      const movie = await MovieModel.findById(args.id).exec();
      if (!movie) {
        throw new Error(ERROR.MOVIE_NOT_FOUND.message);
      }

      if (args.rating < 1 || args.rating > 5) {
        throw new Error(ERROR.INVALID_RATING.message);
      }

      const newRating = Math.round((movie.rating + args.rating) / 2);

      const updatedMovie = (await MovieModel.findByIdAndUpdate(
        { _id: args.id },
        { rating: newRating },
        { new: true }
      ).exec()) as Omit<MovieModelType, "_id">;

      return updatedMovie;
    },

    updateMovie: async (
      _parent: unknown,
      args: MutationUpdateMovieArgs
    ): Promise<Omit<MovieModelType, "_id">> => {
      const movie = (await MovieModel.findByIdAndUpdate(args.id, args.input, {
        new: true
      }).exec()) as Omit<MovieModelType, "_id">;

      return movie;
    },

    deleteMovie: async (
      _parent: unknown,
      args: MutationDeleteMovieArgs
    ): Promise<Omit<MovieModelType, "_id">> => {
      const movie = await MovieModel.findByIdAndDelete(args.id).exec();
      if (!movie) {
        throw new Error(ERROR.MOVIE_NOT_FOUND.message);
      }
      return movie;
    }
  }
};
