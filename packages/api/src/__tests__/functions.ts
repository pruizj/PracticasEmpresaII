import mongoose, { Mongoose } from "mongoose";
import { CinemaModel } from "../db-models/cinema";
import { MovieModel } from "../db-models/movie";
import { UserModel } from "../db-models/user";
import { startMongoConnection } from "../lib/mongoose-connection";
import { exec } from "child_process";
import { PORT } from "../config";
import { main } from "../server";
const { MONGO_URL_TEST, PORT_TEST } = process.env;

export const BeforeAll = async <T>(db: Mongoose): Promise<Mongoose> => {
  db = await startMongoConnection(
    MONGO_URL_TEST || "mongodb://localhost:4003/cinema_listing_test"
  );

  process.env.DEBUG && console.log("Connected to MongoDB");

  // clean database before starting tests
  await UserModel.deleteMany({});
  await MovieModel.deleteMany({});
  await CinemaModel.deleteMany({});

  return db;
};

export const AfterAll = async <T>(db: Mongoose): Promise<Mongoose> => {
  // clean database after tests
  await UserModel.deleteMany({});
  await MovieModel.deleteMany({});
  await CinemaModel.deleteMany({});

  // update PORT in .env by adding 1 to it
  let port = PORT_TEST ? parseInt(PORT_TEST) + 1 : 4004;
  if (port === 4003) {
    port += 1;
  } else if (port === 8009) {
    port += 1;
  }
  exec(`sed -i 's/PORT_TEST=${PORT_TEST}/PORT_TEST=${port}/g' .env`);

  db.disconnect();
  return db;
};
