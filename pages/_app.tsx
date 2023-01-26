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
        <title>SolPyre</title>
        <meta name="description" content="solana burning services" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
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
