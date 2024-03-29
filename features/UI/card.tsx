import classNames from "classnames";
import Image from "next/image";
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  project?: {
    name: string;
    imageUrl: string;
    onClick?: () => void;
  };
}
export const Card = ({ project, className, children, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={classNames([
        className,
        "bg-stone-800 rounded-2xl shadow-deep border-2 border-narentines-amber-200 cursor-pointer hover:shadow-deep-float hover:scale-[1.02] transition-all duration-300 ease-in-out",
      ])}
    >
      {!!project?.imageUrl ? (
        <div className="h-[300px] w-[300px]">
          <Image
            src={`${project.imageUrl}`}
            alt=""
            width="400"
            height="400"
            className="rounded-l-xl rounded-t-xl rounded-r-xl"
          />
        </div>
      ) : (
        <div className="bg-stone-800 rounded-xl h-[300px] w-[300px]" />
      )}
      {children}
    </div>
  );
};
