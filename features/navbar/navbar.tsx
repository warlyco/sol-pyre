import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { socialLinks } from "features/navbar/social-links";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="w-full fixed top-0 z-10 border-b border-b-stone-900">
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
          <div className="flex justify-center">
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
          </div>
          {/* <WalletMultiButton /> */}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
