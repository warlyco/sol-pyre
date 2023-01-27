import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import classNames from "classnames";
import { socialLinks } from "features/navbar/social-links";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ProjectConfig {
  name: string;
  headerImage: string;
  bgColor: string;
  route: string;
}

const projectConfigs: ProjectConfig[] = [
  {
    name: "Narentines",
    headerImage: "/images/projects/narentines/narentines-logo.svg",
    bgColor: "bg-stone-900",
    route: "/burn/narentines",
  },
];

export const Navbar = () => {
  const router = useRouter();

  const [activeProject, setActiveProject] = useState<ProjectConfig | null>(
    null
  );

  useEffect(() => {
    const project = projectConfigs.find((project) =>
      router.pathname.includes(project.route)
    );
    if (project) setActiveProject(project);
  }, [router.pathname]);

  return (
    <div
      className={classNames([
        "w-full fixed top-0 z-10 border-b border-b-stone-900 shadow-xl",
        activeProject?.bgColor ? activeProject.bgColor : "bg-stone-900",
      ])}
    >
      <header className="mx-auto max-w-6xl">
        <nav className="w-full flex items-center justify-between text-2xl uppercase p-4 tracking-widest">
          <div className="flex space-x-4 items-center">
            <Image
              className="w-4 h-5"
              src="/images/sol-flame.png"
              alt="logo"
              width="22"
              height="1"
            />
            <Link href="/">SolPyre</Link>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-300"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
            {router.pathname.includes("/burn") && <WalletMultiButton />}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
