import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const colors = {
  light: {
    background: "#F9F9F9",
    text: "#1C1C1C",
    primary: "#36A3CF", // blue-cyan
    secondary: "#57C785", // green
    border: "#D9D9D9",
    notification: "#E63946", // error
  },
  dark: {
    background: "#121212",
    text: "#F2F2F2",
    primary: "#36A3CF",
    secondary: "#57C785",
    border: "#2C2C2C",
    notification: "#E63946",
  },
};

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.light.background,
    text: colors.light.text,
    primary: colors.light.primary,
    border: colors.light.border,
    notification: colors.light.notification,
  },
};

export const DarkThemeCustom = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.dark.background,
    text: colors.dark.text,
    primary: colors.dark.primary,
    border: colors.dark.border,
    notification: colors.dark.notification,
  },
};
