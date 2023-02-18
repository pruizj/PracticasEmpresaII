import { ApolloClient, InMemoryCache } from "@apollo/client";

// Get the token from the cookie and add it to the headers
//Only when document exists (browser) and the cookie exists
const isBrowser = typeof window !== "undefined";

const token =
  isBrowser &&
  document &&
  document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

const localClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_CLIENT_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: "Bearer " + token
  }
});

export default localClient;
