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

export default function ProfileComponent({
  profile,
}: {
  profile: ProfileType;
}) {
  return (
    <Card className=" min-w-[500px] flex flex-col justify-between">
      {/* TODO Add avatar for users profile */}
      <CardContent>
        <div className="p-2 border rounded-t shadow">
          <HandMetal className=" mx-auto" />
          <Typography gutterBottom variant="h5" component="div">
            {profile.name}
          </Typography>
        </div>

        <Accordion
          disableGutters
          className="border border-t-0"
          disabled={!profile.bands.length}
        >
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Typography component={"span"}>Bands</Typography>
            <Typography sx={{ marginLeft: "1rem" }} component={"span"}>
              ({profile.bands.length})
            </Typography>
          </AccordionSummary>
          {profile.bands.length && (
            <AccordionDetails>
              <List disablePadding className=" grid gap-2">
                {profile.bands.map((band) => {
                  return (
                    <ListItem
                      disablePadding
                      className={"border rounded bg-slate-100 "}
                    >
                      <ListItemButton>{band.name}</ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </AccordionDetails>
          )}
        </Accordion>
      </CardContent>

      <CardActions className=" flex justify-center">
        <Button size="small">View profile</Button>
      </CardActions>
    </Card>
  );
}
