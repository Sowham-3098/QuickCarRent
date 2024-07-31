import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
  ButtonGroup,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ShoppingCart, CarRental } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { Colors } from "../styles/theme/theme";

const AppBarContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem 1rem",
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  position: "fixed",
  top: "1rem",
  left: "50%",
  transform: "translateX(-50%)",
  width: "calc(100% - 2rem)",
  maxWidth: "1200px",
  zIndex: 1000,
});

const AppBarLogo = styled(Typography)({
  flexGrow: 1,
  fontWeight: "bold",
  fontSize: "1.5rem",
  textDecoration: "none",
  color: "orange",
  display: "flex",
  alignItems: "center",
});

const Navbar = () => {
  const mainPages = [
    { name: "Home", link: "/" },
    
  ];
  

  const cartState = useSelector((state) => state.cart.cartProducts);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpenDrawer(open);
  };

  const drawerList = (anchor) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        padding: ".5rem",
        fontSize: "1.2rem",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ButtonGroup sx={{ display: "flex", flexDirection: "column", mb: ".5rem" }}>
        {mainPages.map((page) => (
          <Link
            key={page.name}
            to={page.link}
            aria-label={`Go to ${page.name}`}
            style={{ textDecoration: 'none' }}
          >
            <Button key={page.name} sx={{ color: Colors.white, margin: "0 1rem" }} aria-label={page.name}>
              {page.name}
            </Button>
          </Link>
        ))}
      </ButtonGroup>
      <Divider color="white" />
      <Link to={`/account`} aria-label="Go to my Account">
        <Button sx={{ color: Colors.white, margin: ".5rem 0 0 .5rem" }}>
          <AccountCircleIcon />
        </Button>
      </Link>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ background: "none", boxShadow: "none" }}>
      {matches ? (
        <AppBarContainer>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={toggleDrawer("top", true)}
          >
            <MenuIcon />
          </IconButton>

          <Drawer anchor="top" open={openDrawer} onClose={toggleDrawer("top", false)}>
            {drawerList("top")}
          </Drawer>

          <AppBarLogo variant="h6" noWrap component="a" href="/" sx={{ color : "#ffa500"}}>
            Quick Car Rent 
          </AppBarLogo>

          <Link to={`/booking-history`} aria-label="Booking History">
              <Button sx={{ color: Colors.primary }}>
                <CarRental />
                
              </Button>
            </Link>
        </AppBarContainer>
      ) : (
        <AppBarContainer>
           <AppBarLogo variant="h6" noWrap component="a" href="/" sx={{ color : "#ffa500"}}>
            Quick Car Rent 
          </AppBarLogo>
        
          <Box>
            {mainPages.map((page) => (
              <Link key={page.name} to={page.link} style={{ textDecoration: 'none' }}>
                <Button sx={{ color: Colors.primary, mx: 1 }}>
                  {page.name}
                </Button>
              </Link>
            ))}
            <Link to={`/account`} aria-label="Go to my Account Page">
              <Button sx={{ color: Colors.primary }}>
                <AccountCircleIcon />
              </Button>
            </Link>
            <Link to={`/booking-history`} aria-label="Booking History">
              <Button sx={{ color: Colors.primary }}>
                <CarRental />
                
              </Button>
            </Link>
          </Box>
        </AppBarContainer>
      )}
    </AppBar>
  );
};

export default Navbar;
