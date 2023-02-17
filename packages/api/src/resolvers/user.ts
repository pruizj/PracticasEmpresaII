import { GraphQLError } from "graphql";
import { ERROR } from "../errors";
import { UserModel, UserModelType } from "../db-models/user";
import {
  MutationDeleteUserArgs,
  MutationGiveAdminRoleArgs,
  MutationLoginArgs,
  MutationRegisterArgs,
  User
} from "../gql/types";
import { checkPasswordSecure } from "../lib/login";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { Context } from "../server";
import { BCRYPT_SALT, JWT_SECRET } from "../config";

export const userResolver = {
  Query: {
    me: async (
      _parent: unknown,
      _args: unknown,
      context: Context
    ): Promise<Omit<UserModelType, "_id">> => {
      try {
        const me = await UserModel.findOne({
          email: context.user?.email
        }).exec();
        if (!me) {
          throw new Error("USER_NOT_FOUND");
        }
        return me;
      } catch (e) {
        throw new GraphQLError(ERROR[e.message]?.message || e.message, {
          extensions: { code: ERROR[e.message]?.code || "500" }
        });
      }
    },

    users: async (
      _parent: unknown,
      _args: unknown
    ): Promise<Omit<UserModelType, "_id">[]> => {
      try {
        const users = await UserModel.find().exec();
        return users;
      } catch (e) {
        throw new GraphQLError(ERROR[e.message]?.message || e.message, {
          extensions: { code: ERROR[e.message]?.code || "500" }
        });
      }
    }
  },
  Mutation: {
    register: async (
      _parent: any,
      args: MutationRegisterArgs
    ): Promise<Omit<UserModelType, "_id">> => {
      try {
        const user = await UserModel.findOne({
          email: args.input.email
        }).exec();
        if (user) {
          throw new Error("USER_ALREADY_EXISTS");
        }

        // Check if password is secure
        if (!checkPasswordSecure(args.input.password)) {
          throw new Error("PASSWORD_NOT_SECURE");
        }

        const hash_password = await bcrypt.hash(
          args.input.password,
          parseInt(BCRYPT_SALT || "12")
        );

        const newUser = await UserModel.create({
          ...args.input,
          password: hash_password
        });
        return newUser;
      } catch (e) {
        throw new GraphQLError(ERROR[e.message]?.message || e.message, {
          extensions: { code: ERROR[e.message]?.code || "500" }
        });
      }
    },

    login: async (_parent: any, args: MutationLoginArgs): Promise<string> => {
      try {
        const user = await UserModel.findOne({ email: args.email }).exec();
        const valid =
          user && (await bcrypt.compare(args.password, user.password));

        if (!user || !valid) {
          throw new Error(ERROR.INVALID_USER_OR_PASSWORD.message);
        }

        const token = await sign(
          {
            email: user.email,
            user: user._id,
            role: user.role
          },
          JWT_SECRET || "",
          { expiresIn: "720m" }
        );

        await UserModel.findOneAndUpdate(
          { _id: user._id },
          { $set: { authToken: token } }
        ).exec();

        return token;
      } catch (e) {
        throw new GraphQLError(ERROR[e.message]?.message || e.message, {
          extensions: { code: ERROR[e.message]?.code || "500" }
        });
      }
    },

    giveAdminRole: async (
      _parent: any,
      args: MutationGiveAdminRoleArgs
    ): Promise<Omit<UserModelType, "_id">> => {
      try {
        const user = UserModel.findOne({ _id: args.id });

        if (!user) {
          throw new Error("USER_NOT_FOUND");
        }

        const updatedUser = (await UserModel.findOneAndUpdate(
          { _id: args.id },
          { role: "ADMIN" },
          { new: true }
        ).exec()) as Omit<UserModelType, "_id">;

        return updatedUser;
      } catch (e) {
        throw new GraphQLError(ERROR[e.message]?.message || e.message, {
          extensions: { code: ERROR[e.message]?.code || "500" }
        });
      }
    },

    deleteUser: async (
      _parent: any,
      args: MutationDeleteUserArgs
    ): Promise<Omit<UserModelType, "_id">> => {
      try {
        const user = await UserModel.findOne({ _id: args.id }).exec();

        if (!user) {
          throw new Error("USER_NOT_FOUND");
        }

        const deletedUser = (await UserModel.findOneAndDelete({
          _id: args.id
        }).exec()) as Omit<UserModelType, "_id">;
        return deletedUser;
      } catch (e) {
        throw new GraphQLError(ERROR[e.message]?.message || e.message, {
          extensions: { code: ERROR[e.message]?.code || "500" }
        });
      }
    }
  }
};
