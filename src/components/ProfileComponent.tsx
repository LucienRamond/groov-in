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
import { ChevronDown, HandMetal } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

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
      {/* TODO Add avatar for users profile */}
      <CardContent>
        <div className="p-2 border rounded-t shadow">
          <HandMetal className=" mx-auto" />
          <Typography gutterBottom variant="h5" component="div">
            {profile?.name}
          </Typography>
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
