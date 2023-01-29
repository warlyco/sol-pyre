import { XCircleIcon } from "@heroicons/react/24/outline";
import { Card } from "features/UI/card";
import Image from "next/image";
import { useState } from "react";
import { Metaplex, Nft } from "@metaplex-foundation/js";
import Overlay from "features/UI/overlay";
import { useIsLoading } from "hooks/is-loading";

export interface NftCardProps extends React.HTMLAttributes<HTMLDivElement> {
  nft?: {
    json: {
      name: string;
      image: string;
    };
  };
  collection: [];
  setNftToBurn: (nft: Nft) => void;
}

export const NftCard = ({ nft, collection, setNftToBurn }: NftCardProps) => {
  const { isLoading } = useIsLoading();
  const [modal, setModal] = useState<React.ReactNode | undefined>(undefined);

  const handleSelectNft = (nft: Nft) => {
    setNftToBurn(nft);
    setModal(undefined);
  };

  const openModal = () => {
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
              className="rounded-xl border-2 border-narentines-green-100 shadow-deep hover:shadow-deep-float"
              src={nft?.json?.image || ""}
              alt="Nft image"
              width="200"
              height="200"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Card
        onClick={!!nft ? () => {} : openModal}
        project={
          !!nft
            ? {
                name: nft.json.name,
                imageUrl: nft.json.image,
              }
            : undefined
        }
      />
      <Overlay isVisible={isLoading || !!modal} modal={modal} />
    </>
  );
};
