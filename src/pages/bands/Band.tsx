import { useEffect, useState } from "react";
import { BandType } from "../../utils/types/bandTypes";
import { useParams } from "react-router";
import Page from "../../components/Page";
import { Divider, Typography } from "@mui/material";
import ProfileComponent from "../../components/ProfileComponent";

export default function Band() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const [band, setBand] = useState<BandType>();

  useEffect(() => {
    fetch(`${BASE_URL}/bands/${id}`)
      .then((response) => response.json())
      .then((data) => !data.message && setBand(data));
  }, [BASE_URL, id]);

  return (
    <Page>
      <div
        className={
          "p-4  flex items-center flex-col   text-[var(--secondary-background-color)]"
        }
      >
        <Typography
          variant={"h4"}
          sx={{ fontWeight: "bold" }}
          className=" pb-4 "
        >
          {band?.name}
        </Typography>
        <Typography sx={{ fontStyle: "italic" }} className=" pb-2">
          - Created by {band?.created_by[0].name} -
        </Typography>
        <Divider flexItem>
          <Typography variant={"h6"} sx={{ fontWeight: "bold" }}>
            Description
          </Typography>
        </Divider>
        <Typography align="center" className=" py-2 w-[80%]">
          {band?.description
            ? band.description
            : `Don't have a description yet :(`}
        </Typography>
        <Divider flexItem>
          <Typography
            variant={"h6"}
            sx={{ fontWeight: "bold" }}
            className=" pb-2"
          >
            Members
          </Typography>
        </Divider>
        <div className=" grid grid-cols-2 gap-2">
          {band?.members.map((member) => {
            return <ProfileComponent id={member.id} />;
          })}
        </div>
      </div>
    </Page>
  );
}
