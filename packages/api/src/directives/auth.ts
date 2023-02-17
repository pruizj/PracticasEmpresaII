import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { GraphQLSchema } from "graphql";
import { ERROR } from "../errors";

const authDirective = (directiveName: string) => {
  const typeDirectiveArgumentMaps: Record<string, any> = {};
  return {
    authDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: type => {
          const authDirective = getDirective(schema, type, directiveName)?.[0];
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          return undefined;
        },
        // @ts-ignore: Unreachable code error
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ??
            typeDirectiveArgumentMaps[typeName];

          if (authDirective) {
            const { requires } = authDirective;
            if (requires) {
              const { resolve } = fieldConfig;
              fieldConfig.resolve = function (source, args, context, info) {
                if (
                  !context ||
                  !context.user ||
                  typeof context.user === "undefined"
                ) {
                  throw new Error(ERROR.LOGIN_NEEDED.message);
                } else {
                  let passed = false;
                  for (const roleReq of requires) {
                    if (context.user.role === roleReq) {
                      passed = true;
                      return resolve?.(source, args, context, info);
                    }
                  }
                  if (!passed) {
                    throw new Error(ERROR.ROLE_NEEDED.message);
                  }
                }
              };
            }
          }
        }
      })
  };
};

const { authDirectiveTransformer } = authDirective("auth");

export { authDirectiveTransformer };
