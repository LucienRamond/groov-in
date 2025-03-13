import { ReactNode } from "react";

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div className=" sm:max-w-[90%] bg-[var(--third-background-color)] border border-[var(--border-color)] border-t-0 rounded-b-xl m-auto min-h-[100vh] sm:px-4 sm:pb-4">
      <div className="grid justify-center justify-items-center w-full grid-cols-1">
        {children}
      </div>
    </div>
  );
}
