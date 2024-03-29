import { BookingModel, BookingModelType } from "../db-models/booking";
import { CinemaModel, CinemaModelType } from "../db-models/cinema";
import { ERROR } from "../errors";
import {
  MutationCreateBookingArgs,
  MutationDeleteBookingArgs,
  QueryBookingArgs
} from "../gql/types";
import { validationCard } from "../lib/validationCard";
import { ObjectId } from "bson";
import { Context } from "../server";
import { MovieModel, MovieModelType } from "../db-models/movie";
import { UserModel, UserModelType } from "../db-models/user";

export const bookingResolver = {
  Query: {
    bookings: async (): Promise<Omit<BookingModelType, "_id">[]> => {
      const bookings = await BookingModel.find().exec();
      return bookings;
    },

    userBookings: async (
      _parent: unknown,
      args: QueryBookingArgs,
      context: Context
    ): Promise<Omit<BookingModelType, "_id">[]> => {
      const bookings = await BookingModel.find({
        user: context.user?.id
      }).exec();
      return bookings;
    },

    booking: async (
      _parent: unknown,
      args: QueryBookingArgs
    ): Promise<Omit<BookingModelType, "_id">> => {
      const booking = await BookingModel.findById(args.id).exec();
      if (!booking) {
        throw new Error(ERROR.BOOKING_NOT_FOUND.message);
      }
      return booking;
    }
  },

  Mutation: {
    createBooking: async (
      _parent: unknown,
      args: MutationCreateBookingArgs,
      context: Context
    ): Promise<Omit<BookingModelType, "_id">> => {
      const schedule = await CinemaModel.distinct("schedule", {
        _id: args.cinema
      }).exec();

      schedule.map(schedule => {
        if (
          schedule.day === args.schedule.day &&
          schedule.time === args.schedule.time &&
          schedule.room === args.schedule.room &&
          schedule.movie.toString() === args.schedule.movie
        ) {
          if (schedule.capacity === 0) {
            throw new Error(ERROR.BOOKING_FULL.message);
          } else {
            if (schedule.capacity < args.seats) {
              throw new Error(ERROR.BOOKING_FULL.message);
            }
            schedule.capacity -= args.seats;
          }
        }
      });

      // update schedule
      await CinemaModel.updateOne(
        { _id: args.cinema },
        { schedule: schedule }
      ).exec();

      // check validation card number
      const validation = validationCard(
        args.cardNumber,
        args.expiry_date,
        args.security_code
      );
      if (!validation) {
        throw new Error(ERROR.CARD_NUMBER_INVALID.message);
      }

      const booking = await BookingModel.create({
        cinema: args.cinema,
        movie: args.schedule.movie,
        day: args.schedule.day,
        time: args.schedule.time,
        room: args.schedule.room,
        seats: args.seats,
        price: parseFloat("8.5") * args.seats,
        user: context.user ? new ObjectId(context.user.id) : null,
        cardNumber: args.cardNumber,
        expiry_date: args.expiry_date,
        security_code: args.security_code
      });

      return booking;
    },

    deleteBooking: async (
      _parent: unknown,
      args: MutationDeleteBookingArgs
    ): Promise<boolean> => {
      const booking = await BookingModel.findById(args.id).exec();
      if (!booking) {
        throw new Error(ERROR.BOOKING_NOT_FOUND.message);
      }

      // restore schedule capacity
      const schedule = await CinemaModel.distinct("schedule", {
        _id: booking.cinema
      }).exec();

      schedule.map(schedule => {
        if (
          schedule.day === booking.day &&
          schedule.time === booking.time &&
          schedule.room === booking.room &&
          schedule.movie === booking.movie
        ) {
          schedule.capacity += booking.seats;
        }
      });

      // update schedule
      await CinemaModel.updateOne(
        { _id: booking.cinema },
        { schedule: schedule }
      ).exec();

      await BookingModel.deleteOne({ _id: args.id }).exec();
      return true;
    }
  },

  Booking: {
    cinema: async (
      parent: BookingModelType
    ): Promise<Omit<CinemaModelType, "_id">> => {
      const cinema = await CinemaModel.findById(parent.cinema).exec();
      if (!cinema) {
        throw new Error(ERROR.CINEMA_NOT_FOUND.message);
      }
      return cinema;
    },
    movie: async (
      parent: BookingModelType
    ): Promise<Omit<MovieModelType, "_id">> => {
      const movie = await MovieModel.findById(parent.movie).exec();
      if (!movie) {
        throw new Error(ERROR.MOVIE_NOT_FOUND.message);
      }
      return movie;
    },
    user: async (
      parent: BookingModelType
    ): Promise<Omit<UserModelType, "_id">> => {
      const user = await UserModel.findById(parent.user).exec();
      if (!user) {
        throw new Error(ERROR.USER_NOT_FOUND.message);
      }
      return user;
    }
  }
};
