import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useContext, useState } from "react";
import { LogOutIcon, Settings } from "lucide-react";
import { useNavigate } from "react-router";
import { UserContext } from "../../providers/user/UserContext";

export default function UserNavBar() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    fetch(`${BASE_URL}/user/logout`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then(() => {
        setUser(null);
        handleClose();
        navigate("/user/login");
      });
  };

  return (
    <>
      {!user ? (
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
        <ListItem disableGutters disablePadding>
          <ListItemButton
            id="settings-button"
            aria-controls={open ? "settings-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => handleClick(e)}
          >
            <ListItemText
              sx={{ whiteSpace: "nowrap" }}
              primary={`${user.name}`}
            />
          </ListItemButton>
          <Menu
            id="settings-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "settings-button",
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/user/settings");
                handleClose();
              }}
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              Settings
            </MenuItem>

            <MenuItem onClick={() => logout()}>
              <ListItemIcon>
                <LogOutIcon />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </ListItem>
      )}
    </>
  );
}
