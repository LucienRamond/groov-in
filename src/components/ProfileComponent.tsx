import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { ProfileType } from "../utils/types/profileType";
import { HandMetal } from "lucide-react";

export default function ProfileComponent({
  profile,
}: {
  profile: ProfileType;
}) {
  return (
    <Card className=" min-w-[500px] p-2">
      {/* TODO Add avatar for users profile */}
      <HandMetal className=" mx-auto" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {profile.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {profile.email}
        </Typography>
        {/* TODO Add list of bands */}
      </CardContent>

      <CardActions className=" flex justify-center">
        <Button size="small" color="primary">
          View profile
        </Button>
      </CardActions>
    </Card>
  );
}
