import {
  BURNING_WALLET_ADDRESS,
  COLLECTION_WALLET_ADDRESS,
} from "constants/constants";
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
  createCloseAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
  NATIVE_MINT,
} from "@solana/spl-token";
import * as splToken from "@solana/spl-token";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstructionCtorFields,
} from "@solana/web3.js";
import { executeTransaction } from "utils/transactions";
import { asWallet } from "utils/as-wallet";
import showToast from "toasts/show-toast";
import { Card } from "features/UI/card";
import { BottomBanner } from "features/UI/bottom-banner";
import { NftCard } from "features/UI/nft-card";
import classNames from "classnames";
import Modal from "features/UI/modal";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BURN_ATTEMPT } from "graphql/mutations/add-burn-attempt";
import { GET_BURNS_COUNT } from "graphql/queries/get-burns-count";

const FEE_AMOUNT = 0.01;

export default function Home() {
  const { loading, data: burnsCountRes } = useQuery(GET_BURNS_COUNT);

  const [burnedNftsCount, setBurnedNftsCount] = useState(0);

  useEffect(() => {
    if (loading) return;
    const { count } = burnsCountRes?.burns_aggregate.aggregate;

    setBurnedNftsCount((count + 6) * 3); // +6 to temp account for missing db entries
  }, [burnsCountRes, loading]);

  return (
    <div className=" bg-narentines-green-100 min-h-screen relative overflow-hidden pt-32">
      <Head>
        <title>Narentines Pyre</title>
      </Head>

      <div className="text-3xl text-center py-8">This burn has ended.</div>

      <div className="bg-narentines-amber-200 p-4 rounded-xl shadow-deep mb-16 max-w-sm mx-auto text-center text-xl">
        <div>Narentines burned on SolPyre:</div>
        <div className="text-3xl mb-2 flex items-center justify-center h-10">
          {burnedNftsCount ? burnedNftsCount : <Spinner />}
        </div>
        <div>Narentines burned in total:</div>
        <div className="text-3xl mb-2 flex items-center justify-center h-10">
          1,125
        </div>
        <a
          href="https://magiceden.io/marketplace/narentinesnft"
          className="text-narentines-green-100 text-base underline"
          target="_blank"
          rel="noreferrer"
        >
          Buy Narentines on Magic Eden
        </a>
      </div>

      <BottomBanner>
        <a href="https://solpyre.com">
          <div className="text-xs flex bg-stone-900 p-2 px-4 rounded-full shadow-xl">
            powered by{" "}
            <Image
              className="w-3 h-4 ml-2 mr-1"
              src="/images/sol-flame.png"
              alt="logo"
              width="22"
              height="1"
            />{" "}
            SolPyre
          </div>
        </a>
      </BottomBanner>

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
