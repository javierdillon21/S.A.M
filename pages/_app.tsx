import "../styles/globals.css";
import "../utils/fontAwesome.ts";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;