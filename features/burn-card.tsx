import { Card, CardProps } from "features/UI/card";

export const BurnCard = ({ project, className, children }: CardProps) => {
  return (
    <Card project={project} key={project.name}>
      {children}
    </Card>
  );
};
