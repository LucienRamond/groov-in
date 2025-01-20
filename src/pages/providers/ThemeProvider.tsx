import React, { useEffect, useState } from "react";
import { ThemeContext } from "./themeContext";

interface Props {
  children?: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  function getThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem("darkTheme");
    if (savedTheme) {
      return savedTheme == "true" ? setDarkTheme(true) : setDarkTheme(false);
    }
  }

  useEffect(() => {
    getThemeFromLocalStorage();
  }, []);

  function toggleThemeHandler() {
    setDarkTheme((prevTheme) => {
      const newTheme = prevTheme === false ? true : false;
      localStorage.setItem("darkTheme", newTheme.toString());
      return newTheme;
    });
  }

  return (
    <ThemeContext.Provider
      value={{
        darkTheme: darkTheme,
        toggleTheme: toggleThemeHandler,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
