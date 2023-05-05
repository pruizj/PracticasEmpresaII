import { graphql } from "graphql";
import { Context } from "../server";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import * as path from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers } from "@graphql-tools/merge";
import { GraphQLSchema } from "graphql";
import { allResolvers } from "../resolvers/allResolvers";
import { authDirectiveTransformer } from "../directives/auth";

export const typeDefs = loadSchemaSync(
  path.join(__dirname, "../schemas/modules/allSchemas.graphql"),
  {
    loaders: [new GraphQLFileLoader()]
  }
);

let exSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: mergeResolvers(allResolvers)
});

exSchema = authDirectiveTransformer(exSchema);

// Helper method that returns the graph
export const graphQLHelper = async (
  source: string,
  variableValues?: any,
  contextValue?: Context
) => {
  return graphql({
    schema: exSchema,
    source,
    rootValue: {},
    contextValue,
    variableValues
  });
};
