import "../styles/index.css";
import "../utils/fontAwesome.ts";
import React from "react";
import type { AppProps } from "next/app";
import Menu from "../components/menu";
import { createClient, Provider } from "urql";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "../src/aws-exports";
Amplify.configure(awsconfig);

const client = createClient({
  url: "https://3hisfcaeuvbtrl4zsvrfx6smby.appsync-api.us-east-1.amazonaws.com/graphql",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <div className="flex flex-col-reverse sm:flex-row min-h-screen bg-gray-100">
        <Menu />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
