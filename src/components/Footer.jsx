import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Colors } from "../styles/theme/theme";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        background: "linear-gradient(to bottom, #a1a1aa,#a1a1aa )",
        color: "white",
        width: "100vw",
        padding: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="body2"
      sx={{color: "#000000" , marginLeft: "4px"}}>
        © 2024 Sowham Bhuin All Rights Reserved
      </Typography>
      <Box>
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/sowham-bhuin"
          target="_blank"
          aria-label="LinkedIn"
          sx={{ color: "gray", margin: "0 0.5rem" }}
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://github.com/Sowham-3098"
          target="_blank"
          aria-label="GitHub"
          sx={{ color: "#000000", margin: "0 0.5rem" }}
        >
          <GitHubIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
