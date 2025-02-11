import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CirclePause, CirclePlay } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import ToggleTheme from "../theme/ToggleTheme";
import { useEffect, useState } from "react";
import UserNavBar from "./UserNavBar";
export interface User {
  id: number;
  name: string;
}

export default function BrowserNavbar() {
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
            <div className=" flex gap-[2px]">
              <ListItemText className=" text-[var(--color)]" primary="GR" />
              <CirclePlay className=" my-auto" color="var(--color)" />
              <CirclePause className=" my-auto" color="var(--color)" />
              <ListItemText className=" text-[var(--color)]" primary="V'IN" />
            </div>
          </ListItemIcon>
        </ListItem>
        <ListItem disablePadding>
          <Button>
            <NavLink
              to={"/"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active bg-[var(--color)] text-[var(--secondary-background-color)] font-bold p-2 rounded min-w-[90px]"
                  : "active text-[var(--color)] font-bold p-2 rounded min-w-[90px]"
              }
            >
              Home
            </NavLink>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button>
            <NavLink
              to={"/profiles"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active bg-[var(--color)] text-[var(--secondary-background-color)] font-bold p-2 rounded min-w-[90px]"
                  : "active text-[var(--color)] font-bold p-2 rounded min-w-[90px]"
              }
            >
              Profiles
            </NavLink>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button>
            <NavLink
              to={"/bands"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active bg-[var(--color)] text-[var(--secondary-background-color)] font-bold p-2 rounded min-w-[90px]"
                  : "active text-[var(--color)] font-bold p-2 rounded min-w-[90px]"
              }
            >
              Bands
            </NavLink>
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button>
            <NavLink
              to={"/my-bands"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active bg-[var(--color)] text-[var(--secondary-background-color)] font-bold p-2 rounded min-w-[90px]"
                  : "active text-[var(--color)] font-bold p-2 rounded min-w-[90px]"
              }
            >
              My&nbsp;bands
            </NavLink>
          </Button>
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
    </div>
  );
}
