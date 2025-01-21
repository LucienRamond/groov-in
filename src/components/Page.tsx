import { Typography } from "@mui/material";
import { ReactNode } from "react";

export default function Page({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className=" max-w-[90vw] bg-[var(--third-background-color)] border border-[var(--border-color)] border-t-0 rounded-b-xl m-auto min-h-[80vh] px-4 pb-4">
      {title && (
        <Typography
          variant="h5"
          className=" bg-[var(--secondary-background-color)] border text-[var(--color)] border-[var(--color)] border-t-0 rounded-b-xl p-2"
        >
          {title}
        </Typography>
      )}
      <div className="grid justify-center">{children}</div>
    </div>
  );
}
