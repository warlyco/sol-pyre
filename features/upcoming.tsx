import { BurnCard } from "features/burn-card";

const projects = [
  {
    name: "Narentines",
    imageUrl: "/images/projects/narentines.webp",
    description: (
      <div className="space-y-2">
        <div>
          <span className="underline">Burn:</span> 3x Narentines
        </div>
        <div>
          <span className="underline">Receive:</span> 1x Lupers Free Mint WL
          Token
        </div>
      </div>
    ),
  },
  // {
  //   name: "Builders DAO",
  //   imageUrl: "/images/projects/thebuildersdao.webp",
  //   description: (
  //     <div className="space-y-2">
  //       <div>
  //         <span className="underline">Burn:</span> 1x Tin can
  //       </div>
  //       <div>
  //         <span className="underline">Receive:</span> 1x Piece of @bus&apos;s
  //         soul
  //       </div>
  //     </div>
  //   ),
  // },
];

export const Upcoming = () => {
  return (
    <div className="bg-stone-900 py-24 md:px-0">
      <div className="text-center text-3xl md:text-4xl">Upcoming Burns</div>
      <div className="max-w-5xl mx-auto py-16">
        <div className="flex flex-wrap -mx-4 justify-center">
          {projects.map((project) => (
            <div className="md:w-1/3 p-4 flex" key={project.name}>
              <BurnCard project={project}>{project?.description}</BurnCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
