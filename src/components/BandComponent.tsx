import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";

import { ChevronDown } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BandType } from "../utils/types/bandTypes";
import ProfileAvatar from "./ProfileAvatar";
import EditBand from "../pages/bands/EditBand";
import { UserContext } from "../pages/providers/user/UserContext";

export default function BandComponent({ id }: { id: number }) {
  const [band, setBand] = useState<BandType | undefined>(undefined);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/bands/${id}`)
      .then((response) => response.json())
      .then((data) => setBand(data));
  }, [BASE_URL, id]);

  return (
    <Card className="max-w-[550px] w-full grid !rounded-xl !bg-[#241e20] !bg-[url(assets/profile/card-content.webp)] bg-no-repeat bg-contain">
      <CardContent
        sx={{ padding: 0 }}
        className="min-h-[200px] grid content-between"
      >
        <div className="mx-5 mt-7 rounded-t-xl p-4 flex items-center gap-4 bg-[var(--color)]">
          <ProfileAvatar name={band?.name} />
          <div className=" w-full">
            <Typography
              className={`border-b border-[var(--secondary-background-color)]
                    text-left text-[var(--secondary-background-color)]`}
              variant="h5"
            >
              {band?.name}
            </Typography>
          </div>
        </div>
        <div className=" px-5 pb-2">
          <Accordion
            square
            disableGutters
            disabled={!band?.members.length}
            className="rounded-b-xl !bg-[var(--background-color)]"
          >
            <AccordionSummary expandIcon={<ChevronDown color="white" />}>
              <Typography component={"span"} className=" text-white">
                Members
              </Typography>
              <Typography
                sx={{ marginLeft: "1rem" }}
                component={"span"}
                className=" text-white"
              >
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
                          className=" flex gap-2"
                        >
                          <ProfileAvatar
                            size="small"
                            profile_picture={member.avatar_img}
                          />
                          {member.name}
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
          onClick={() => navigate(`/bands/${band?.id}`)}
          className=" !bg-[var(--border-color)] !text-[var(--color)] hover:!bg-[var(--color)] hover:!text-[var(--border-color)] !transition-colors !ease-in !duration-300"
        >
          View band
        </Button>
        {user?.id == band?.created_by[0].id && <EditBand band_data={band} />}
      </CardActions>
    </Card>
  );
}
