import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import Head from "next/head";
import localClient from "../lib/localClient";
import "typeface-roboto";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // const isBrowser = typeof window !== "undefined";
  // const token =
  //   isBrowser &&
  //   document &&
  //   document.cookie.replace(
  //     /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
  //     "$1"
  //   );
  // if (!token && isBrowser && window.location.pathname !== "/login") {
  //   if (window.location.pathname !== "/google-redirect") {
  //     window.location.replace("/login");
  //   }
  // }

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/general.css" />
        <link rel="icon" href="/images/icon.jpg" />
        <title>Cinema Listing</title>
      </Head>
      <ApolloProvider client={localClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
};

export default MyApp;
