import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import { NavLink, useNavigate } from "react-router";
import ToggleTheme from "../theme/ToggleTheme";
import { useEffect, useState } from "react";
import UserNavBar from "./UserNavBar";
export interface User {
  id: number;
  name: string;
}

export default function MobileNavbar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      setCurrentUser(undefined);
    } else {
      setCurrentUser(JSON.parse(user));
    }
  }, [navigate]);

  return (
    <div className=" flex justify-between border-b border-[var(--color)] bg-[var(--secondary-background-color)]">
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
        {!currentUser ? (
          <>
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
          </>
        ) : (
          <UserNavBar
            user={currentUser}
            navigate={(destination: string) => navigate(destination)}
          />
        )}
        <ListItem disablePadding disableGutters>
          <ToggleTheme />
        </ListItem>
      </List>
      <Paper
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          justifyContent: "",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "var(--secondary-background-color)",
        }}
        elevation={3}
        className=" justify-center"
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
              <Typography>Home</Typography>
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
              <Typography>Bands</Typography>
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
              <Typography>Profiles</Typography>
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
                ? "active w-full  bg-[var(--color)]  text-[var(--secondary-background-color)] font-bold p-2 min-w-[90px]"
                : "active w-full  text-[var(--color)] font-bold p-2 min-w-[90px]"
            }
          >
            <div className=" grid justify-items-center">
              <PlayIcon />
              <Typography>My bands</Typography>
            </div>
          </NavLink>
        </Button>
      </Paper>
    </div>
  );
}
