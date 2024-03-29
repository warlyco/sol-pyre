import Image from "next/image";
import Link from "next/link";

const project = {
  name: "Narentines",
  imageUrl: "/images/projects/narentines/narentines.webp",
};
export const Featured = () => {
  return (
    <div className="bg-stone-800 py-24 text-stone-300">
      <div className="text-center text-3xl md:text-4xl mb-8">Featured Burn</div>
      <div className="flex max-w-5xl lg:mx-auto border-2 border-orange-500 rounded-xl border-opacity-40 shadow-deep cursor-pointer hover:scale-[1.03] hover:shadow-deep-float mx-10 transition-all duration-300 ease-in-out">
        <Link className="flex flex-wrap" href="/burns/narentines">
          <div className="w-full md:w-1/3 flex flex-shrink-0 h-72 md:h-auto">
            <Image
              style={{ objectFit: "cover" }}
              src={project.imageUrl}
              alt="project logo"
              width="700"
              height="700"
              className="rounded-t-xl md:rounded-l-xl md:rounded-r-none"
            />
          </div>
          <div className="p-8 w-full md:w-2/3">
            <div className="text-3xl md:text-4xl mb-4 uppercase">
              {project.name}
            </div>
            <div className="space-y-2 text-xl">
              <div>
                <span className="uppercase italic pr-2">Burn</span> 3x
                Narentines
              </div>
              <div>
                <span className="uppercase italic pr-2">Receive</span> 1x Lupers
                Free Mint Token
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
