import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";

type Props = {
  children: any;
};

export default function MainLayout({ children }: Props) {
  const Navbar = dynamic(() => import("features/navbar/navbar"), {
    ssr: false,
  });

  return (
    <div className="relative bg-stone-900" suppressHydrationWarning={true}>
      <Navbar />
      <Toaster />
      {children}
      <div className="fixed bottom-0 mx-auto w-full">
        <div className="flex justify-center text-slate-300 text-xs w-full">
          <div className="py-2">
            🛠️ by{" "}
            <a href="https://twitter.com/warly_sol" className="underline">
              warly.sol
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
