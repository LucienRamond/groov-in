import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CirclePause, CirclePlay } from "lucide-react";
import { useNavigate } from "react-router";
import ToggleTheme from "../theme/ToggleTheme";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-between border-b border-[var(--color)] bg-[var(--secondary-background-color)]">
      <List className=" flex">
        <ListItem>
          <ListItemIcon className=" flex justify-center">
            <div className=" flex gap-[2px]">
              <ListItemText className=" text-[var(--color)]" primary="GR" />
              <CirclePlay className=" my-auto" color="var(--color)" />
              <CirclePause className=" my-auto" color="var(--color)" />
              <ListItemText className=" text-[var(--color)]" primary="V'IN" />
            </div>
          </ListItemIcon>
        </ListItem>
        <ListItem disablePadding disableGutters>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding disableGutters>
          <ListItemButton onClick={() => navigate("/profiles")}>
            <ListItemText primary="Profiles" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding disableGutters>
          <ListItemButton onClick={() => navigate("/bands/my-bands")}>
            <ListItemText primary="MyBands" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding disableGutters>
          <ListItemButton onClick={() => navigate("/bands")}>
            <ListItemText primary="Bands" />
          </ListItemButton>
        </ListItem>
      </List>
      <List className=" flex">
        <ListItem disablePadding disableGutters>
          <ListItemButton onClick={() => navigate("/user/login")}>
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding disableGutters>
          <ListItemButton onClick={() => navigate("/user/register")}>
            <ListItemText primary="Register" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding disableGutters>
          <ToggleTheme />
        </ListItem>
      </List>
    </div>
  );
}
