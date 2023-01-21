import { XCircleIcon } from "@heroicons/react/24/outline";
import { CREATOR_ADDRESS } from "constants/constants";
import { Metaplex, Nft } from "@metaplex-foundation/js";
import Overlay from "features/UI/overlay";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useIsLoading } from "hooks/is-loading";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import Spinner from "features/UI/spinner";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { isLoading } = useIsLoading();
  const [modal, setModal] = useState<React.ReactNode | undefined>(undefined);
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [collection, setCollection] = useState<any>([]);
  const [nftToBurn, setNftToBurn] = useState<any>(undefined);

  const fetchNFTs = useCallback(async () => {
    if (!publicKey) return;
    const metaplex = Metaplex.make(connection);
    const nftMetasFromMetaplex = await metaplex
      .nfts()
      .findAllByOwner({ owner: publicKey });

    console.log(nftMetasFromMetaplex);

    const nftCollection = nftMetasFromMetaplex.filter(
      ({ creators }: { creators: any }) => {
        return creators?.[0]?.address?.toString() === CREATOR_ADDRESS;
      }
    );
    if (!nftCollection.length) return;

    let nftsWithMetadata: any = [];

    for (const nft of nftCollection) {
      // @ts-ignore
      const metadata = await metaplex.nfts().load({ metadata: nft });
      nftsWithMetadata.push(metadata);
    }

    setCollection(nftsWithMetadata);

    console.log(nftsWithMetadata);
  }, [publicKey, connection]);

  const handleBurnNft = useCallback(async () => {
    alert("BURN");
  }, []);

  const handleSelectNft = (nft: Nft) => {
    setNftToBurn(nft);
    setModal(undefined);
  };

  useEffect(() => {
    if (collection.length) return;
    fetchNFTs();
  }, [collection.length, fetchNFTs]);

  return (
    <div className="flex justify-center items-center bg-green-800 min-h-screen relative overflow-hidden">
      <Head>
        <title>BURN</title>
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

      <div>
        {!collection.length && !nftToBurn && <Spinner />}
        {!!collection.length && !nftToBurn && (
          <button
            className="text-green-800 border-2 border-amber-400 hover: bg-amber-400 p-4 rounded-xl shadow-deep hover:shadow-deep-float hover:bg-green-800 hover:text-amber-400 text-2xl font-bold overflow-y-auto"
            onClick={() =>
              setModal(
                <div className="flex flex-wrap justify-around overflow-y-auto relative">
                  <div className="sticky flex w-full justify-end">
                    <button
                      className="self-end text-2xl"
                      onClick={() => setModal(undefined)}
                    >
                      <XCircleIcon className="h-8 w-8" />
                    </button>
                  </div>
                  {collection.map((nft: Nft, i: number) => (
                    <div
                      key={i}
                      className="p-2 rounded-xl py-3 cursor-pointer hover:scale-[1.03] my-4"
                      onClick={() => handleSelectNft(nft)}
                    >
                      <Image
                        className="rounded-xl border-2 border-green-800 shadow-deep hover:shadow-deep-float"
                        src={nft?.json?.image || ""}
                        alt="Nft image"
                        width="200"
                        height="200"
                      />
                    </div>
                  ))}
                </div>
              )
            }
          >
            Select Narentine
          </button>
        )}
        {!!nftToBurn && (
          <div className="p-4 bg-amber-400 rounded-2xl border-24 border-green-800 shadow-deep hover:shadow-deep-float">
            <Image
              className="rounded-xl "
              src={nftToBurn?.json?.image || ""}
              alt="Nft image"
              width="300"
              height="300"
            />
            <div className="text-2xl py-3">{nftToBurn?.json?.name}</div>

            <div className="flex justify-between space-x-2">
              <button
                className="text-green-800 border-2 border-green-800 bg-amber-400 p-4 py-2 rounded-xl shadow-md hover:bg-gray-400 text-2xl font-bold overflow-y-auto w-full"
                onClick={() => setNftToBurn(undefined)}
              >
                Cancel
              </button>
              <button
                className="text-amber-400 border-2 border-green-800 bg-green-800 p-4 py-2 rounded-xl shadow-md hover:bg-orange-600 hover:text-amber-400 text-2xl font-bold overflow-y-auto w-full"
                onClick={handleBurnNft}
              >
                Burn
              </button>
            </div>
          </div>
        )}
      </div>
      <Overlay isVisible={isLoading || !!modal} modal={modal} />

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
