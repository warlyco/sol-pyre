import { BURNING_WALLET_ADDRESS } from "constants/constants";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { CREATOR_ADDRESS } from "constants/constants";
import { Metaplex, Nft } from "@metaplex-foundation/js";
import Overlay from "features/UI/overlay";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useIsLoading } from "hooks/is-loading";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import Spinner from "features/UI/spinner";
import Image from "next/image";
import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import * as splToken from "@solana/spl-token";
import {
  PublicKey,
  Transaction,
  TransactionInstructionCtorFields,
} from "@solana/web3.js";
import { executeTransaction } from "utils/transactions";
import { asWallet } from "utils/as-wallet";
import showToast from "toasts/show-toast";

export default function Home() {
  return (
    <div className="flex justify-center items-center bg-stone-900 min-h-screen relative overflow-hidden">
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

      <div className="text-center">
        <h1 className="text-7xl md:text-8xl mb-4 uppercase tracking-widest">
          SolPyre
        </h1>
        <h2 className="text-xl">
          solana &nbsp;
          <span className="text-orange-400 p-1 rounded">burning</span>
          &nbsp; services
        </h2>
        <div className="py-10">
          <div className="w-full border border-slate-300 opacity-20"></div>
        </div>
        <div className="italic text-sm uppercase">Coming soon</div>
      </div>

      <style jsx>{`
        html,
        body {
          max-height: 100vh;
          overflow: hidden;
        }
        #__next {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
