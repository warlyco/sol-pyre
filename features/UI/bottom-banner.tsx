export const BottomBanner = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed bottom-0 mx-auto w-full">
      <div className="flex justify-center text-slate-300 w-full p-2">
        {children}
      </div>
    </div>
  );
};
