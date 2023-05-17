import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const isBrowser = typeof window !== "undefined";
const token =
  isBrowser &&
  document &&
  document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_CLIENT_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const wsLink = isBrowser
  ? new WebSocketLink({
      uri: `ws://localhost:8009/graphql`,
      options: {
        reconnect: true,
        connectionParams: {
          Authorization: `Bearer ${token}`
        }
      }
    })
  : null;

const link = isBrowser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

const localClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default localClient;
