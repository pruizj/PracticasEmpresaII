import { ApolloServer } from "apollo-server-express";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import express from "express";
import http from "http";
import { startMongoConnection } from "./lib/mongoose-connection";
import exSchema from "./schemas/modules/allSchemas";
import { User } from "./gql/types";
import { checkToken } from "./lib/login";
import { MONGO_URL, TEST, PORT, PORT_TEST } from "./config";
const { PubSub } = require("graphql-subscriptions");

export interface Context {
  user: User | undefined;
}

export const pubsub = new PubSub();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  schema: exSchema,
  context: async ctx => {
    let user;
    try {
      const authorization = ctx.req.headers.authorization || "";
      const [type, token] = authorization.split(" ");
      if (type === "Bearer" && token && token !== null) {
        user = await checkToken(token);
      }
      return { user };
    } catch (e) {
      throw new Error(e.message);
    }
  },
  introspection: true
});

const subscriptionServer = SubscriptionServer.create(
  {
    schema: exSchema,
    execute,
    subscribe
  },
  {
    server: httpServer,
    path: server.graphqlPath
  }
);

export const main = async () => {
  !TEST && console.info("Starting api", process.env);

  if (!PORT || !MONGO_URL) {
    console.error("ERROR WITH ENV");
    return;
  }

  try {
    !TEST && (await startMongoConnection(MONGO_URL));

    await server.start();

    server.applyMiddleware({
      app,
      path: "/graphql",
      cors: true,
      bodyParserConfig: true
    });

    await new Promise<void>(resolve =>
      httpServer.listen({ port: !TEST ? PORT : PORT_TEST }, resolve)
    );
    !TEST && console.info(`🚀 Server ready at http://localhost:${PORT}`);
    !TEST && console.info(`🚀 Subscriptions ready at ws://localhost:${PORT}`);
  } catch (e) {
    console.error("Server creation error", e);
  }
};

main();
