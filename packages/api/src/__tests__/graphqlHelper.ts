import { graphql } from "graphql";
import schema from "../schemas/modules/allSchemas";
import { Context } from "../server";

// Helper method that returns the graph
export const graphQLHelper = async (
  source: string,
  variableValues?: any,
  contextValue?: Context
) => {
  return graphql({
    schema,
    source,
    rootValue: {},
    contextValue,
    variableValues
  });
};
