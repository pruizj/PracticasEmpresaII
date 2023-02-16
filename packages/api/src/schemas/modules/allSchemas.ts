import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import * as path from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers } from "@graphql-tools/merge"
import { GraphQLSchema } from "graphql";
import { allResolvers } from "../../resolvers/allResolvers";

export const typeDefs = loadSchemaSync(
  path.join(__dirname, "./allSchemas.graphql"),
  {
    loaders: [new GraphQLFileLoader()]
  }
);

let exSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: mergeResolvers(allResolvers)
});

export default exSchema;
