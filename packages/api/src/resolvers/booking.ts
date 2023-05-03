import { BookingModel, BookingModelType } from "../db-models/booking";
import { CinemaModel } from "../db-models/cinema";
import { ERROR } from "../errors";
import {
  MutationCreateBookingArgs,
  MutationDeleteBookingArgs,
  QueryBookingArgs
} from "../gql/types";
import { validationCard } from "../lib/validationCard";
import { ObjectId } from "bson";
import { Context } from "../server";

export const bookingResolver = {
  Query: {
    bookings: async (): Promise<Omit<BookingModelType, "_id">[]> => {
      const bookings = await BookingModel.find().exec();
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
          schedule.movie === args.schedule.movie
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
      if (
        !validationCard(args.cardNumber, args.expiry_date, args.security_code)
      ) {
        throw new Error(ERROR.CARD_NUMBER_INVALID.message);
      }

      const booking = await BookingModel.create({
        cinema: args.cinema,
        movie: args.schedule.movie,
        day: args.schedule.day,
        room: args.schedule.room,
        seats: args.seats,
        price: 6.5,
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
      await BookingModel.deleteOne({ _id: args.id }).exec();
      return true;
    }
  }
};
