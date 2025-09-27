import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Check for saved preference and also respect OS preference as a fallback
    if (typeof window !== "undefined") {
      const savedPreference = localStorage.getItem("dark-mode");
      if (savedPreference !== null) {
        return savedPreference === "true";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement; // This is the <html> element

    // The correct logic:
    // If isDarkTheme is true, add the 'dark' class.
    // If isDarkTheme is false, remove the 'dark' class.
    if (isDarkTheme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save the user's explicit choice to localStorage
    localStorage.setItem("dark-mode", isDarkTheme);
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
