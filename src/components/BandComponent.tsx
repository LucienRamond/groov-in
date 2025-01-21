import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

import { BandType } from "../utils/types/band";
import { useNavigate } from "react-router";

export default function BandComponent({ band }: { band: BandType }) {
  const navigate = useNavigate();
  return (
    <Card className=" min-w-[500px] p-2">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {band.name}
        </Typography>

        {/* TODO Add list of members */}
        {/* TODO Add a count of users who  like the band */}
      </CardContent>

      <CardActions className=" flex justify-center">
        <Button
          size="small"
          color="primary"
          onClick={() => navigate(`/bands/${band.id}`)}
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
        Created by {band.created_by.name}
      </Typography>
    </Card>
  );
}
