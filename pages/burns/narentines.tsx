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
import { Card } from "features/UI/card";
import { BottomBanner } from "features/UI/bottom-banner";
import { NftCard } from "features/UI/nft-card";
import classNames from "classnames";

export default function Home() {
  const { isLoading, setIsLoading } = useIsLoading();
  const [modal, setModal] = useState<React.ReactNode | undefined>(undefined);
  const wallet = useWallet();
  const { connection } = useConnection();
  const [collection, setCollection] = useState<any>([]);
  const [nftsToBurn, setNftsToBurn] = useState<any>([
    undefined,
    undefined,
    undefined,
  ]);
  const { publicKey, signTransaction } = wallet;

  const [hasBeenFetched, setHasBeenFetched] = useState(false);

  const fetchNFTs = useCallback(async () => {
    if (!publicKey) return;
    setIsLoading(true);
    const metaplex = Metaplex.make(connection);
    const nftMetasFromMetaplex = await metaplex
      .nfts()
      .findAllByOwner({ owner: publicKey });

    const nftCollection = nftMetasFromMetaplex.filter(
      ({ creators }: { creators: any }) => {
        return creators?.[0]?.address?.toString() === CREATOR_ADDRESS;
      }
    );
    if (!nftCollection.length) {
      setIsLoading(false);
      setHasBeenFetched(true);
      return;
    }

    let nftsWithMetadata: any = [];

    for (const nft of nftCollection) {
      // @ts-ignore
      const metadata = await metaplex.nfts().load({ metadata: nft });
      nftsWithMetadata.push(metadata);
    }

    setCollection(nftsWithMetadata);
    setHasBeenFetched(true);
    setIsLoading(false);
  }, [publicKey, setIsLoading, connection]);

  const handleTransferNfts = useCallback(async () => {}, []);

  const handleTransferNft = useCallback(async () => {
    if (
      (!nftsToBurn[0] && !nftsToBurn[1] && !nftsToBurn[2]) ||
      !publicKey ||
      !signTransaction
    )
      return;
    setIsLoading(true);
    showToast({
      primaryMessage: "🔥 Sending your NFT to the furnace 🔥",
    });

    const instructions: TransactionInstructionCtorFields[] = [];

    for (const nft of nftsToBurn) {
      const fromTokenAccountAddress = await splToken.getAssociatedTokenAddress(
        nft?.address,
        publicKey
      );

      const toTokenAccountAddress = await splToken.getAssociatedTokenAddress(
        nft?.address,
        new PublicKey(BURNING_WALLET_ADDRESS)
      );

      const associatedDestinationTokenAddr = await getAssociatedTokenAddress(
        nft?.address,
        new PublicKey(BURNING_WALLET_ADDRESS)
      );

      const receiverAccount = await connection.getAccountInfo(
        associatedDestinationTokenAddr
      );

      if (!receiverAccount) {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            publicKey,
            associatedDestinationTokenAddr,
            new PublicKey(BURNING_WALLET_ADDRESS),
            nft?.address
          )
        );
      }

      instructions.push(
        createTransferInstruction(
          fromTokenAccountAddress,
          toTokenAccountAddress,
          publicKey,
          1
        )
      );
    }

    const latestBlockhash = await connection.getLatestBlockhash();
    const transaction = new Transaction({ ...latestBlockhash });
    transaction.add(...instructions);

    executeTransaction(
      connection,
      transaction,
      {
        callback: () => setIsLoading(false),
        successCallback: () => {
          showToast({
            primaryMessage: "🔥 NFT sent to the furnace 🔥",
            secondaryMessage: "You will receive your reward shortly!",
          });
          setNftsToBurn(undefined);
        },
      },
      asWallet(wallet)
    );
  }, [
    nftsToBurn,
    publicKey,
    signTransaction,
    setIsLoading,
    connection,
    wallet,
  ]);

  useEffect(() => {
    if (collection.length || hasBeenFetched) return;

    fetchNFTs();
  }, [collection.length, fetchNFTs, hasBeenFetched]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-narentines-green-100 min-h-screen relative overflow-hidden">
        <Head>
          <title>Narentines Pyre</title>
        </Head>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-narentines-green-100 min-h-screen relative overflow-hidden">
      <Head>
        <title>Narentines Pyre</title>
      </Head>

      <div>
        {!collection.length && (
          <div className="flex flex-col items-center">
            <h1 className="text-3xl text-narentines-amber-200 max-w-md text-center">
              {/* "You do not have any NFTs in this burn campaign." */}

              {!!publicKey
                ? "Campaign has not started yet"
                : "Please connect your wallet"}
            </h1>
          </div>
        )}
        {!!collection.length && (
          <>
            <div className="text-3xl text-center text-narentines-amber-200 mb-12">
              Select 3 Narentines to Sacrifice
            </div>
            <div className="flex">
              <div className="px-4">
                <NftCard
                  nftsToBurn={nftsToBurn}
                  setNftToBurn={(selectedNft) => {
                    setNftsToBurn([
                      ...nftsToBurn.slice(0, 0),
                      selectedNft,
                      ...nftsToBurn.slice(0 + 1),
                    ]);
                  }}
                  nft={nftsToBurn?.[0]}
                  collection={collection}
                />
              </div>
              <div className="px-4">
                <NftCard
                  nftsToBurn={nftsToBurn}
                  setNftToBurn={(selectedNft) => {
                    setNftsToBurn([
                      ...nftsToBurn.slice(0, 1),
                      selectedNft,
                      ...nftsToBurn.slice(1 + 1),
                    ]);
                  }}
                  nft={nftsToBurn?.[1]}
                  collection={collection}
                />
              </div>
              <div className="px-4">
                <NftCard
                  nftsToBurn={nftsToBurn}
                  setNftToBurn={(selectedNft) => {
                    setNftsToBurn([
                      ...nftsToBurn.slice(0, 2),
                      selectedNft,
                      ...nftsToBurn.slice(2 + 1),
                    ]);
                  }}
                  nft={nftsToBurn?.[2]}
                  collection={collection}
                />
              </div>
            </div>
          </>
        )}
        {!!publicKey && (
          <div className="flex justify-between space-x-4 mt-16 max-w-md mx-auto">
            <button
              className="text-narentines-green-100 border-2 border-narentines-green-100 bg-narentines-amber-200 p-4 py-2 rounded-xl shadow-xl hover:bg-gray-400 text-2xl font-bold overflow-y-auto w-full"
              onClick={() => setNftsToBurn([undefined, undefined, undefined])}
            >
              Clear
            </button>
            <button
              disabled={nftsToBurn.some((nft: Nft) => !nft)}
              className={classNames(
                "text-narentines-amber-200 border-2 border-narentines-amber-200 bg-narentines-green-100 p-4 py-2 rounded-xl shadow-xl text-2xl font-bold overflow-y-auto w-full",
                {
                  "opacity-50 cursor-not-allowed": nftsToBurn.some(
                    (nft: Nft) => !nft
                  ),
                  "hover:bg-orange-600 hover:text-narentines-amber-200":
                    !nftsToBurn.some((nft: Nft) => !nft),
                }
              )}
              onClick={handleTransferNft}
            >
              Burn
            </button>
          </div>
        )}
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
      <Overlay isVisible={isLoading} />

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
