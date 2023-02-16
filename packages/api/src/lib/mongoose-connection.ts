import mongoose, { Mongoose } from "mongoose";

export const startMongoConnection = async (
  mongoUrl: string
): Promise<Mongoose> => {
  try {
    const db = await mongoose.connect(mongoUrl);
    process.env.DEBUG && console.info("Successfully connected to Mongo");
    return db;
  } catch (e) {
    console.error("Error connecting to mongo", e);
    throw new Error("Error connecting to mongo");
  }
};
