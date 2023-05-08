import { ChannelModel, ChannelModelType } from "../db-models/channel";
import { MessageModel, MessageModelType } from "../db-models/message";
import { UserModel } from "../db-models/user";
import { ERROR } from "../errors";
import {
  MutationJoinArgs,
  MutationQuitArgs,
  MutationSendMessageArgs,
  QueryGetChatArgs,
  Role,
  User
} from "../gql/types";
import { Context, pubsub } from "../server";
import { ObjectId } from "bson";

export const forumResolver = {
  Query: {
    getChats: async (
      _parent: unknown
    ): Promise<Omit<ChannelModelType, "_id">[]> => {
      const chats = await ChannelModel.find().exec();
      return chats;
    },
    getChat: async (
      _parent: unknown,
      args: QueryGetChatArgs
    ): Promise<Omit<ChannelModelType, "_id">> => {
      const chat = await ChannelModel.findById(args.id).exec();
      if (!chat) {
        throw new Error(ERROR.CHANNEL_NOT_FOUND.message);
      }
      return chat;
    }
  },

  Mutation: {
    join: async (
      _parent: unknown,
      args: MutationJoinArgs,
      context: Context
    ): Promise<{ channel: Omit<ChannelModelType, "_id">; user: User }> => {
      let channel = await ChannelModel.findOne({
        name: args.channelName
      }).exec();

      if (!channel) {
        channel = await ChannelModel.create({
          name: args.channelName,
          participants: context.user ? [new ObjectId(context.user.id)] : [],
          messages: []
        });
      } else {
        const exists =
          channel.participants &&
          channel.participants.length > 0 &&
          channel.participants.some(participant => {
            return participant.toString() === context.user?.id;
          });
        if (!exists) {
          channel = await ChannelModel.findOneAndUpdate(
            { _id: channel._id },
            { $push: { participants: new ObjectId(context.user?.id) } },
            { new: true }
          ).exec();
        }
      }

      pubsub.publish("onMemberJoin", {
        onMemberJoin: { user: context.user, channel }
      });

      return {
        channel: channel as ChannelModelType,
        user: context.user as User
      };
    },

    sendMessage: async (
      _parent: unknown,
      args: MutationSendMessageArgs,
      context: Context
    ): Promise<Omit<MessageModelType, "_id">> => {
      const channel = await ChannelModel.findOne({
        name: args.channelName,
        participants: { $in: [new ObjectId(context.user?.id)] }
      }).exec();

      if (!channel) {
        throw new Error(ERROR.CHANNEL_NOT_FOUND.message);
      }

      const newMessage = await MessageModel.create({
        text: args.text,
        createdBy: new ObjectId(context.user?.id)
      });

      await ChannelModel.findByIdAndUpdate(
        channel._id,
        { $push: { messages: newMessage._id } },
        { new: true }
      ).exec();

      pubsub.publish("onMessageAdded", { onMessageAdded: newMessage });

      return newMessage;
    },

    quit: async (
      _parent: unknown,
      args: MutationQuitArgs,
      context: Context
    ): Promise<Omit<ChannelModelType, "_id">> => {
      const channel = await ChannelModel.findOne({
        name: args.channelName,
        participants: { $in: [new ObjectId(context.user?.id)] }
      }).exec();
      if (!channel) {
        throw new Error(ERROR.CHANNEL_NOT_FOUND.message);
      }

      const updatedChannel = await ChannelModel.findOneAndUpdate(
        { _id: channel._id },
        { $pull: { participants: new ObjectId(context.user?.id) } },
        { new: true }
      ).exec();

      if (updatedChannel && updatedChannel.participants.length === 0) {
        await ChannelModel.deleteOne({ _id: updatedChannel._id }).exec();
      }

      pubsub.publish("onQuit", { onQuit: { channel: updatedChannel } });

      return updatedChannel as Omit<ChannelModelType, "_id">;
    }
  },

  Subscription: {
    onMessageAdded: {
      subscribe: (parent: any, args: any, context: any) => {
        const asyncIterator = pubsub.asyncIterator("onMessageAdded");
        return asyncIterator;
      }
    },

    onMemberJoin: {
      subscribe: (parent: any, args: any, context: any) => {
        const asyncIterator = pubsub.asyncIterator("onMemberJoin");
        return asyncIterator;
      }
    },

    onQuit: {
      subscribe: (parent: any, args: any, context: any) => {
        const asyncIterator = pubsub.asyncIterator("onQuit");
        return asyncIterator;
      }
    }
  },

  Channel: {
    participants: async (parent: ChannelModelType): Promise<User[]> => {
      return await UserModel.find({ _id: { $in: parent.participants } }).exec();
    },

    messages: async (
      parent: ChannelModelType
    ): Promise<Omit<MessageModelType, "_id">[]> => {
      return await MessageModel.find({ _id: { $in: parent.messages } }).exec();
    }
  },

  Message: {
    createdBy: async (parent: MessageModelType): Promise<User> => {
      const user = await UserModel.findOne({ _id: parent.createdBy }).exec();
      if (!user) {
        return {
          id: new ObjectId().toString(),
          name: "unknown",
          email: "unknown",
          password: "",
          authToken: "",
          role: Role.User
        };
      }
      return user;
    },

    channel: async (parent: MessageModelType): Promise<ChannelModelType> => {
      const channel = await ChannelModel.findOne({
        messages: { $in: [parent._id] }
      }).exec();
      if (!channel) {
        throw new Error(ERROR.CHANNEL_NOT_FOUND.message);
      }
      return channel;
    }
  }
};
