import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { startMongoConnection } from "./lib";
import exSchema from "./schemas/modules/allSchemas";

const {
  PORT,
  MONGO_URL,
} = process.env;

export interface Context {
  //user: User | undefined;
  user:String
}

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  schema: exSchema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

const main = async () => {
  console.info("Starting api", process.env);

  if (
    !PORT ||
    !MONGO_URL
  ) {
    console.error("ERROR WITH ENV");
    return;
  }
  try {
    await startMongoConnection(MONGO_URL);

    await server.start();
    app.use(
      "/graphql",
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(server, {
        context: async ctx => {
          let user = "hola"
          return { user };
        }
      })
    );

    await new Promise<void>(resolve =>
      httpServer.listen({ port: PORT }, resolve)
    );
    console.info(`🚀 Server ready at http://localhost:${PORT}`);
  } catch (e) {
    console.error("Server creation error", e);
  }
};

main();
