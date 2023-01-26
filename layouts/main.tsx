import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

type Props = {
  children: any;
};

export default function MainLayout({ children }: Props) {
  const router = useRouter();
  const Navbar = dynamic(() => import("features/navbar/navbar"), {
    ssr: false,
  });

  return (
    <div className="relative bg-stone-900" suppressHydrationWarning={true}>
      <Navbar />
      <Toaster />
      {children}
    </div>
  );
}
