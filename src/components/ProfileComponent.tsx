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
    <Card className=" w-[500px] flex flex-col border justify-between">
      <CardContent>
        <div className="p-4 flex items-center gap-4 border rounded-t shadow">
          <ProfileAvatar name={profile?.name} />
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

        <Accordion
          disableGutters
          className="border border-t-0"
          disabled={!profile?.bands.length}
        >
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Typography component={"span"}>Bands</Typography>
            <Typography sx={{ marginLeft: "1rem" }} component={"span"}>
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
      </CardContent>

      <CardActions className=" flex justify-center">
        <Button
          size="small"
          onClick={() => navigate(`/profiles/${profile?.id}`)}
        >
          View profile
        </Button>
      </CardActions>
    </Card>
  );
}
