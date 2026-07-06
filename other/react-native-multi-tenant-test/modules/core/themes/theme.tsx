import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { Theme } from "./theme.types";
import { lightTheme } from "./theme.light";
import { darkTheme } from "./theme.dark";
import { useBrandContent } from "../../sdk/useBrand";

const ThemeContext = createContext<Theme>(lightTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const scheme = useColorScheme() ?? "light";

  const { data } = useBrandContent();

  const theme = useMemo((): Theme => {
    const remoteTheme = data?.themes?.[scheme as "light" | "dark"];

    if (remoteTheme) {
      return remoteTheme as Theme;
    }

    return scheme === "dark" ? darkTheme : lightTheme;
  }, [scheme, data]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
