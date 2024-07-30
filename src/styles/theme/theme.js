import { createTheme } from "@mui/material";

export const Colors = {
  primary: "#ff6600",
  secondary: "#333333",
  primaryLight: "#ff8533",
  primaryDark: "#cc5200",
  secondaryLight: "#4d4d4d",
  secondaryDark: "#1a1a1a",

  // Standard colors
  white: "#ffffff",
  black: "#000000",
  grayLight: "#cccccc",
  grayDark: "#666666",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
      light: Colors.primaryLight,
      dark: Colors.primaryDark,
    },
    secondary: {
      main: Colors.secondary,
      light: Colors.secondaryLight,
      dark: Colors.secondaryDark,
    },
    background: {
      default: Colors.secondaryDark,
      paper: Colors.secondary,
    },
    text: {
      primary: Colors.white,
      secondary: Colors.grayLight,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: Colors.primary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: Colors.white,
        },
      },
    },
  },
});

export default theme;
