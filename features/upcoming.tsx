import { Card } from "features/UI/card";

const projects = [
  {
    name: "Narentines",
    imageUrl: "/images/projects/narentines/narentines.webp",
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
];

export const Upcoming = () => {
  return (
    <div className="bg-stone-900 py-20 md:px-0 text-stone-300">
      <div className="text-center text-3xl md:text-4xl pb-8">
        Upcoming Burns
      </div>
      <div className="max-w-5xl mx-auto overflow-x-auto">
        <div className="flex flex-wrap md:-mx-4 justify-center">
          {projects.map((project) => (
            <div className="md:w-1/3 p-4 flex" key={project.name}>
              <Card project={project}>{project?.description}</Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
