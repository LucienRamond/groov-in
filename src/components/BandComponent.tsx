import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";

import { BandType } from "../utils/types/bandTypes";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import EditBand from "../pages/bands/EditBand";

export default function BandComponent({
  id,
  edit,
}: {
  id: number;
  edit?: boolean;
}) {
  const [band, setBand] = useState<BandType | undefined>(undefined);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/bands/${id}`)
      .then((response) => response.json())
      .then((data) => setBand(data));
  }, [BASE_URL, id]);

  return (
    <Card className=" min-w-[500px] p-2 grid">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {band?.name}
        </Typography>

        <Accordion
          disableGutters
          className="border border-t-0"
          disabled={!band?.members.length}
        >
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Typography component={"span"}>Members</Typography>
            <Typography sx={{ marginLeft: "1rem" }} component={"span"}>
              ({band?.members.length})
            </Typography>
          </AccordionSummary>
          {band?.members.length && (
            <AccordionDetails>
              <List disablePadding className=" grid gap-2">
                {band?.members.map((member) => {
                  return (
                    <ListItem
                      key={member.id}
                      disablePadding
                      className={"border rounded bg-slate-100 "}
                    >
                      <ListItemButton
                        onClick={() => navigate(`/profiles/${member.id}`)}
                      >
                        {member.name}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </AccordionDetails>
          )}
        </Accordion>
        {/* TODO Add a count of users who  like the band */}
      </CardContent>
      <div className="flex flex-col justify-end">
        <CardActions className=" flex justify-center">
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => navigate(`/bands/${band?.id}`)}
          >
            View band
          </Button>
          {edit && <EditBand band_data={band} />}
        </CardActions>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontStyle: "italic",
            textAlign: "left",
          }}
        >
          {/* TODO Add link to detailled profile page */}
          Created by
          <Button
            variant="text"
            sx={{
              fontSize: "1rem",
              paddingLeft: 0.5,
              textTransform: "capitalize",
              justifyContent: "start",
            }}
            className="italic"
            onClick={() => navigate(`/profiles/${band?.created_by[0].id}`)}
          >
            {band?.created_by[0].name}
          </Button>
        </Typography>
      </div>
    </Card>
  );
}
