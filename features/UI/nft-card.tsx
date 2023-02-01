import { XCircleIcon } from "@heroicons/react/24/outline";
import { Card } from "features/UI/card";
import Image from "next/image";
import { useState } from "react";
import { Metaplex, Nft } from "@metaplex-foundation/js";
import Overlay from "features/UI/overlay";
import { useIsLoading } from "hooks/is-loading";
import classNames from "classnames";
import Modal from "features/UI/modal";

export interface NftCardProps extends React.HTMLAttributes<HTMLDivElement> {
  nft?: {
    json: {
      name: string;
      image: string;
    };
  };
  collection: [];
  setNftToBurn: (nft: Nft | undefined) => void;
  nftsToBurn: Nft[];
  showFireImage: boolean;
}

export const NftCard = ({
  nft,
  collection,
  setNftToBurn,
  nftsToBurn,
  showFireImage,
}: NftCardProps) => {
  const { isLoading } = useIsLoading();
  const [modal, setModal] = useState<React.ReactNode | undefined>(undefined);

  const handleSelectNft = (nft: Nft) => {
    setNftToBurn(nft);
    setModal(undefined);
  };

  const openModal = () => {
    setModal(
      <Modal setModal={setModal}>
        {collection.map((nft: Nft, i: number) => (
          <div
            key={i}
            className={classNames(
              "p-2 rounded-xl py-3 hover:scale-[1.03] my-4 flex-nowrap",
              nftsToBurn.includes(nft)
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            )}
            onClick={
              nftsToBurn.includes(nft) ? () => {} : () => handleSelectNft(nft)
            }
          >
            <Image
              className="rounded-xl border-2 border-narentines-green-100 shadow-deep hover:shadow-deep-float"
              src={nft?.json?.image || ""}
              alt="Nft image"
              width="330"
              height="330"
            />
          </div>
        ))}
      </Modal>
    );
  };

  return (
    <>
      <Card
        className="relative"
        onClick={!!nft ? () => setNftToBurn(undefined) : openModal}
        project={
          !!nft
            ? {
                name: nft.json.name,
                imageUrl: nft.json.image,
              }
            : undefined
        }
      >
        {showFireImage && (
          <Image
            className="absolute -bottom-2 left-4 opacity-70"
            src="/images/purple-fire-2.gif"
            alt="logo"
            width="260"
            height="260"
          />
        )}
      </Card>
      <Overlay isVisible={isLoading || !!modal} modal={modal} />
    </>
  );
};
