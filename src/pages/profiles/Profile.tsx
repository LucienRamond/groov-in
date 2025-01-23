import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProfileType } from "../../utils/types/profileType";
import Page from "../../components/Page";
import { Divider, Typography } from "@mui/material";
import BandComponent from "../../components/BandComponent";

export default function Profile() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const [profile, setProfile] = useState<ProfileType>();

  useEffect(() => {
    fetch(`${BASE_URL}/user/${id}`)
      .then((response) => response.json())
      .then((data) => !data.message && setProfile(data));
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
          {profile?.name}
        </Typography>
        <Divider flexItem>
          <Typography variant={"h6"} sx={{ fontWeight: "bold" }}>
            Description
          </Typography>
        </Divider>
        {/* TOD Add user description */}
        <Typography align="center" className=" py-2 w-[80%]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum odit
          nesciunt saepe rem, numquam veniam veritatis mollitia fuga tempora
          officia inventore totam, eum unde enim, quasi ipsum odio possimus
          minus.
        </Typography>
        <Divider flexItem>
          <Typography
            variant={"h6"}
            sx={{ fontWeight: "bold" }}
            className=" pb-2"
          >
            Bands
          </Typography>
        </Divider>
        <div className=" grid grid-cols-2 gap-2">
          {profile?.bands.map((band) => {
            return <BandComponent id={band.id} />;
          })}
        </div>
      </div>
    </Page>
  );
}
