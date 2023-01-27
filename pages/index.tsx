import { Featured } from "features/featured";
import { Upcoming } from "features/upcoming";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center bg-stone-900 h-[90vh] relative">
        <div className="text-center flex flex-col items-center">
          <Image
            src="/images/sol-flame.png"
            alt="logo"
            width="40"
            height="130"
          />
          <h1 className="text-7xl md:text-8xl mb-4 uppercase tracking-widest mt-12">
            SolPyre
          </h1>
          <h2 className="text-xl mb-16">
            solana &nbsp;
            <span className="text-orange-400 p-1 rounded">burning</span>
            &nbsp; services
          </h2>
          <Link
            href="/about"
            className="bg-orange-500 bg-opacity-30 hover:bg-opacity-80 rounded-lg p-2 px-3 transition-all duration-300"
          >
            learn more
          </Link>
        </div>

        <style jsx>{`
          html,
          body {
            max-height: 100vh;
            overflow: hidden;
          }
          #__next {
            overflow: hidden;
          }
        `}</style>
      </div>
      <Featured />
      <Upcoming />
    </>
  );
}
