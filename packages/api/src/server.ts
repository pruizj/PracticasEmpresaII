import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { startMongoConnection } from "./lib/mongoose-connection";
import exSchema from "./schemas/modules/allSchemas";
import { User } from "./gql/types";
import { checkToken } from "./lib/login";
import { MONGO_URL, PORT } from "./config";

export interface Context {
  user: User | undefined;
}

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  schema: exSchema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: true
});

const main = async () => {
  console.info("Starting api", process.env);

  if (!PORT || !MONGO_URL) {
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
