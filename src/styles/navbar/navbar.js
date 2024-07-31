import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import { Colors } from "../theme/theme"; // Assuming Colors is defined in the theme

const orangeColor = "#ffa500"; // Define a constant for the orange color

export const AppBarContainer = styled(Container)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "3.5rem",
  color: Colors.white,
}));

export const AppBarLogo = styled(Typography)(() => ({
  display: "flex",
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: orangeColor,
  fontSize: "1.3rem",
  fontStyle: "italic",
  alignItems: "center",
}));
