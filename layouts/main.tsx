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
      <div className="mx-auto bg-stone-900">{children}</div>
      <div className="absolute bottom-0 mx-auto">
        <div className="text-center text-slate-300 text-xs">
          <div className="py-2">
            built by{" "}
            <a href="https://twitter.com/warly_sol" className="underline">
              @warly_sol
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
