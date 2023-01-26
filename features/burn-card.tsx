import { Card, CardProps } from "features/UI/card";

export const BurnCard = ({ project, className, children }: CardProps) => {
  return (
    <Card project={project} key={project.name} className="w-1/3">
      <div className="space-y-2">
        <div>
          <span className="underline">Burn:</span> 3x Narentines
        </div>
        <div>
          <span className="underline">Receive:</span> 1x Lupers Free Mint WL
          Token
        </div>
      </div>
    </Card>
  );
};
