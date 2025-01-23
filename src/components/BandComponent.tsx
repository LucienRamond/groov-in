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
import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function BandComponent({ id }: { id: number }) {
  const [band, setBand] = useState<BandType | undefined>(undefined);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/bands/${id}`)
      .then((response) => response.json())
      .then((data) => setBand(data));
  }, [BASE_URL, id]);

  return (
    <Card className=" min-w-[500px] p-2">
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
                      disablePadding
                      className={"border rounded bg-slate-100 "}
                    >
                      <ListItemButton
                        onClick={() => navigate(`/user/${member.id}`)}
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

      <CardActions className=" flex justify-center">
        <Button
          size="small"
          color="primary"
          onClick={() => navigate(`/bands/${band?.id}`)}
        >
          View band
        </Button>
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
        <NavLink to={`/user/${band?.created_by[0].id}`}>
          Created by {band?.created_by[0].name}
        </NavLink>
      </Typography>
    </Card>
  );
}
