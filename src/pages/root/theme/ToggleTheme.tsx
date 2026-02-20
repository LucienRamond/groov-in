import { ListItemButton } from "@mui/material";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../providers/theme/themeContext";
import { Moon, Sun } from "lucide-react";

export default function ToggleTheme() {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkTheme ? "dark" : "light",
    );
  }, [darkTheme]);

  return (
    <ListItemButton onClick={toggleTheme}>
      {darkTheme ? <Sun /> : <Moon />}
    </ListItemButton>
  );
}
