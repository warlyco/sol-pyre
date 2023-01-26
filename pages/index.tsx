import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center bg-stone-900 min-h-screen relative overflow-hidden">
      <div className="text-center flex flex-col items-center">
        <Image src="/images/sol-flame.png" alt="logo" width="40" height="130" />
        <h1 className="text-7xl md:text-8xl mb-4 uppercase tracking-widest mt-12">
          SolPyre
        </h1>
        <h2 className="text-xl">
          solana &nbsp;
          <span className="text-orange-400 p-1 rounded">burning</span>
          &nbsp; services
        </h2>
        <div className="py-10">
          <div className="w-full border border-slate-300 opacity-20"></div>
        </div>
        <div className="italic text-sm uppercase">Coming soon</div>
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
  );
}
