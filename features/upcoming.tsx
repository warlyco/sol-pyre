import { BurnCard } from "features/burn-card";

const projects = [
  {
    name: "Narentines",
    imageUrl: "/images/projects/narentines.webp",
  },
];

export const Upcoming = () => {
  return (
    <div className="bg-stone-900 py-24">
      <div className="text-center text-3xl md:text-4xl">Upcoming Burns</div>
      <div className="flex max-w-5xl mx-auto py-16">
        {projects.map((project) => (
          <BurnCard project={project} key={project.name} className="w-1/3" />
        ))}
      </div>
    </div>
  );
};
