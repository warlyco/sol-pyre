import { ContextProvider } from "providers/context-provider";
import type { AppProps } from "next/app";
import Head from "next/head";
import MainLayout from "layouts/main";
import "styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import Script from "next/script";
import { LoadingProvider } from "hooks/is-loading";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Solana Leagues Sports</title>
      </Head>
      <Script src="https://rawcdn.githack.com/strangerintheq/rgba/0.0.4/rgba.js" />
      <ContextProvider>
        <LoadingProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </LoadingProvider>
      </ContextProvider>
    </>
  );
}
