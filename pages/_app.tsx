import "../styles/index.css";
import "../utils/fontAwesome.ts";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Menu from "../components/menu";
import { createClient, Provider } from "urql";
import awsmobile from "../src/aws-exports";
import { useUser } from "../src/utils/user";
import { useRouter } from "next/router";
import { useUrqlClient } from "../src/utils/urql";
import SpinnerLoading from "../components/spinnerLoading";
import awsExports from "../src/aws-exports";
import Amplify from "aws-amplify";

const client = createClient({
  url: awsmobile.aws_appsync_graphqlEndpoint,
});

Amplify.configure(awsExports);

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loadingUser, reCheckUser] = useUser();
  const router = useRouter();
  const inLoginPage = router.pathname === "/login";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [urqlClient, loadingUrqlClient] = useUrqlClient(user);

  // on every page visisted
  useEffect(() => {
    setIsMenuOpen(false);

    // once logged in, the app will redirect
    // the user to the root page; then, we'll
    // check the user to enter to the app.
    if (router.pathname === "/") {
      reCheckUser();
    }
  }, [router.pathname]);

  useEffect(() => {
    // we redirect just when the user fetching is
    // over and there is no user registered found. Otherwise
    // will render what is below the useEffect.
    if (!(user || loadingUser)) {
      router.push("/login");
    }
  }, [user, loadingUser]);

  // // In the login page, show no app template
  // if (inLoginPage)
  //   return (
  //     <>
  //       <Component {...pageProps} />
  //     </>
  //   );
  if (!user || loadingUrqlClient || !urqlClient)
    return (
      <div className="h-full flex flex-col justify-center">
        <SpinnerLoading />
      </div>
    );
  return (
    <Provider value={urqlClient}>
      <div className="flex flex-col-reverse min-h-screen min-w-screen sm:flex-row bg-gray-100">
        <Menu />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
