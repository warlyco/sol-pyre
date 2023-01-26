import { BurnCard } from "features/burn-card";
import { Card } from "features/UI/card";
import Image from "next/image";
import Link from "next/link";

const project = {
  name: "Narentines",
  imageUrl: "/images/projects/narentines.webp",
};
export const Featured = () => {
  return (
    <div className="bg-stone-800 py-24">
      <div className="text-center text-3xl md:text-4xl mb-16">
        Featured Burn
      </div>
      <div className="flex max-w-5xl mx-auto border-2 border-orange-500 rounded-xl border-opacity-40 shadow-deep cursor-pointer">
        <Link className="flex" href="/burns/narentines">
          <div className="w-1/3 flex flex-shrink-0">
            <Image
              src={project.imageUrl}
              alt=""
              width="500"
              height="500"
              className="rounded-l-xl"
            />
          </div>
          <div className="p-8">
            <div className="text-3xl md:text-4xl mb-4 uppercase">
              {project.name}
            </div>
            <div className="space-y-2 text-xl">
              <div>
                <span className="underline">Burn:</span> 3x Narentines
              </div>
              <div>
                <span className="underline">Receive:</span> 1x Lupers Free Mint
                WL Token
              </div>
              <div className="py-4">
                Narentines are celebrating the release of their upcoming
                collection Lupers by offering a free mint to all Narentines
                holders willing to sacrifice their froggies for the cause.
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
