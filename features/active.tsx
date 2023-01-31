import { Card } from "features/UI/card";
import { useRouter } from "next/router";

const projects = [
  {
    name: "Narentines",
    imageUrl: "/images/projects/narentines/narentines.webp",
    url: "/burns/narentines",
    description: (
      <div className="space-y-2 p-4">
        <div className="text-2xl font-bold mb-4">Narentines Burn</div>
        <div>
          <span className="underline">Burn:</span> 3x Narentines
        </div>
        <div>
          <span className="underline">Receive:</span> 1x Lupers Free Mint Token
        </div>
      </div>
    ),
  },
];

export const Active = () => {
  const router = useRouter();

  return (
    <div className="bg-stone-900 py-20 md:px-0 text-stone-300">
      <div className="text-center text-3xl md:text-4xl pb-8">Active Burns</div>
      <div className="max-w-5xl mx-auto overflow-x-hidden">
        <div className="flex flex-wrap md:-mx-4 justify-center">
          {projects.map((project) => (
            <div className="p-4" key={project.name}>
              <Card project={project} onClick={() => router.push(project.url)}>
                {project?.description}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
