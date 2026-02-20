import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Typography,
} from "@mui/material";
import {
  CirclePause,
  CirclePlay,
  FastForwardIcon,
  HomeIcon,
  PlayIcon,
  UsersIcon,
} from "lucide-react";
import { NavLink } from "react-router";
import ToggleTheme from "../theme/ToggleTheme";
import UserNavBar from "./UserNavBar";
export interface User {
  id: number;
  name: string;
}

export default function MobileNavbar() {
  return (
    <div className="z-50 flex justify-between border-b border-[var(--color)] bg-[var(--secondary-background-color)]">
      <List className=" flex" disablePadding>
        <ListItem>
          <ListItemIcon className=" flex justify-center">
            <div className=" flex gap-[2px] border p-2 rounded border-[var(--color)]">
              <CirclePlay className=" my-auto" color="var(--color)" />
              <CirclePause className=" my-auto" color="var(--color)" />
            </div>
          </ListItemIcon>
        </ListItem>
      </List>
      <List className=" flex">
        <UserNavBar />
        <ListItem disablePadding disableGutters>
          <ToggleTheme />
        </ListItem>
      </List>
      <Paper
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: 0,
          backgroundColor: "var(--secondary-background-color)",
        }}
        elevation={3}
        className=" z-50 justify-center border-t border-[var(--color)]"
      >
        <Button sx={{ padding: 0, width: "full" }}>
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                  ? "active w-full bg-[var(--color)]  text-[var(--secondary-background-color)] font-bold p-2 min-w-[90px]"
                  : "active w-full text-[var(--color)] font-bold p-2 min-w-[90px]"
            }
          >
            <div className=" grid justify-items-center">
              <HomeIcon />
              <Typography fontSize={".8rem"}>Home</Typography>
            </div>
          </NavLink>
        </Button>
        <Button sx={{ padding: 0, width: "full" }}>
          <NavLink
            to={"/bands"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                  ? "active w-full  bg-[var(--color)]  text-[var(--secondary-background-color)] font-bold p-2 min-w-[90px]"
                  : "active w-full  text-[var(--color)] font-bold p-2 min-w-[90px]"
            }
          >
            <div className=" grid justify-items-center">
              <FastForwardIcon />
              <Typography fontSize={".8rem"}>Bands</Typography>
            </div>
          </NavLink>
        </Button>
        <Button sx={{ padding: 0, width: "full" }}>
          <NavLink
            to={"/profiles"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                  ? "active w-full  bg-[var(--color)]  text-[var(--secondary-background-color)] font-bold p-2 min-w-[90px]"
                  : "active  w-full text-[var(--color)] font-bold p-2 min-w-[90px]"
            }
          >
            <div className=" grid justify-items-center">
              <UsersIcon />
              <Typography fontSize={".8rem"}>Profiles</Typography>
            </div>
          </NavLink>
        </Button>
        <Button sx={{ padding: 0, width: "full" }}>
          <NavLink
            to={"/my-bands"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                  ? "active w-full h-full bg-[var(--color)]  text-[var(--secondary-background-color)] font-bold p-2 min-w-[90px]"
                  : "active w-full h-full text-[var(--color)] font-bold p-2 min-w-[90px]"
            }
          >
            <div className=" grid justify-items-center">
              <PlayIcon />
              <Typography fontSize={".8rem"}>My bands</Typography>
            </div>
          </NavLink>
        </Button>
      </Paper>
    </div>
  );
}
