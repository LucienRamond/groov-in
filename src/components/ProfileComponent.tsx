import {
  Button,
  Card,
  CardActions,
  CardContent,
  ListItemButton,
  Typography,
  List,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ListItem,
} from "@mui/material";
import { ProfileType } from "../utils/types/profileType";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import ProfileAvatar from "./ProfileAvatar";

export default function ProfileComponent({ id }: { id: number }) {
  const [profile, setProfile] = useState<ProfileType | undefined>(undefined);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/user/${id}`)
      .then((response) => response.json())
      .then((data) => setProfile(data));
  }, [BASE_URL, id]);

  return (
    <Card className="max-w-[550px] w-full grid !rounded-xl !bg-[#241e20] !bg-[url(assets/profile/card-content.webp)] bg-no-repeat bg-contain">
      <CardContent
        sx={{ padding: 0 }}
        className="min-h-[200px] grid content-between"
      >
        <div className="mx-5 mt-7 rounded-t-xl p-4 flex items-center gap-4 bg-[var(--color)]">
          <ProfileAvatar
            name={profile?.name}
            profile_picture={profile?.avatar_img}
          />
          <div className=" w-full">
            <Typography
              className={`border-b border-[var(--secondary-background-color)]
                text-left text-[var(--secondary-background-color)]`}
              variant="h5"
            >
              {profile?.name}
            </Typography>
            {profile?.instruments.length ? (
              <div className=" flex">
                {profile?.instruments.map((instrument, index) => {
                  return (
                    <Typography
                      key={index}
                      className={` italic text-[var(--secondary-background-color)] ${
                        index != 0 && " lowercase"
                      }`}
                      gutterBottom
                      variant="subtitle1"
                    >
                      {instrument.name}
                      {index != profile.instruments.length - 1 && ","}&nbsp;
                    </Typography>
                  );
                })}
              </div>
            ) : (
              <Typography
                className="text-left"
                color="var(--secondary-background-color)"
              >
                No instruments
              </Typography>
            )}
          </div>
        </div>
        <div className=" px-5 pb-2">
          <Accordion
            square
            disableGutters
            disabled={!profile?.bands.length}
            className="rounded-b-xl !bg-[var(--background-color)]"
          >
            <AccordionSummary expandIcon={<ChevronDown color="white" />}>
              <Typography component={"span"} className=" text-white">
                Bands
              </Typography>
              <Typography
                sx={{ marginLeft: "1rem" }}
                component={"span"}
                className=" text-white"
              >
                ({profile?.bands.length})
              </Typography>
            </AccordionSummary>
            {profile?.bands.length && (
              <AccordionDetails>
                <List disablePadding className=" grid gap-2">
                  {profile?.bands.map((band) => {
                    return (
                      <ListItem
                        key={band.id}
                        disablePadding
                        className={"border rounded bg-slate-100 "}
                      >
                        <ListItemButton
                          onClick={() => navigate(`/bands/${band.id}`)}
                        >
                          {band.name}
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </AccordionDetails>
            )}
          </Accordion>
        </div>
      </CardContent>

      <CardActions className=" h-[60px] flex justify-center bg-[#241e20] !bg-[url(assets/profile/card-footer.webp)] bg-stretch">
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/profiles/${profile?.id}`)}
          className=" !bg-[var(--border-color)] !text-[var(--color)] hover:!bg-[var(--color)] hover:!text-[var(--border-color)] !transition-colors !ease-in !duration-300"
        >
          View profile
        </Button>
      </CardActions>
    </Card>
  );
}
