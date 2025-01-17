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
    <div className=" max-w-[90vw] bg-neutral-700 border border-white border-t-0 rounded-b-xl m-auto min-h-[80vh] px-4 pb-4">
      <Typography
        variant="h5"
        className=" border border-white border-t-0 bg-neutral-800 rounded-b-xl p-2"
      >
        {title}
      </Typography>
      <div className="grid justify-center">{children}</div>
    </div>
  );
}
