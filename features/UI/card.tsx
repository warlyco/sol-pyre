import classNames from "classnames";
import Image from "next/image";
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: {
    name: string;
    imageUrl: string;
    description?: string;
  };
}
export const Card = ({ project, className, children }: CardProps) => {
  const { name, imageUrl, description } = project;

  return (
    <div
      className={classNames([
        className,
        "bg-stone-900 rounded-xl shadow-deep border-2 border-orange-400 border-opacity-50 cursor-pointer hover:shadow-deep-float hover:scale-[1.02] transition-all duration-300 ease-in-out]",
      ])}
    >
      <Image
        src={`${imageUrl}`}
        alt=""
        width="400"
        height="400"
        className=" rounded-t-xl"
      />
      <div className="p-6">
        <div className="text-2xl md:text-3xl mb-4 uppercase">{name}</div>
        <div className="text-xl">{description}</div>
        {children}
      </div>
    </div>
  );
};
