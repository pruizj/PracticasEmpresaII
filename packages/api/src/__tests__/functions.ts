import { Mongoose } from "mongoose";
import { UserModel } from "../db-models/user";
import { startMongoConnection } from "../lib/mongoose-connection";
const { MONGO_URL_TEST } = process.env;

export const BeforeAll = async <T>(db: Mongoose): Promise<Mongoose> => {
  db = await startMongoConnection(
    MONGO_URL_TEST || "mongodb://localhost:4003/cinema_listing_test"
  );

  process.env.DEBUG && console.log("Connected to MongoDB");

  // clean database before starting tests
  await UserModel.deleteMany({});

  return db;
};

export const AfterAll = async <T>(db: Mongoose): Promise<Mongoose> => {
  // clean database after tests
  await UserModel.deleteMany({});

  db.disconnect();
  return db;
};
