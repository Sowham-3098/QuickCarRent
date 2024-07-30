import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { removeUser } from "../features/user/UserSlice";
import { MyButton } from "../styles/buttons/buttons";
import { PageContainer } from "../styles/page/containers";
import { Typography, Button, Paper, Box } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { Colors } from "../styles/theme/theme";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();
  const navigate = useNavigate(); // Hook for navigation

  const handleBookingHistory = () => {
    navigate('/booking-history'); // Redirect to Booking History page
  };

  return isAuth ? (
    <PageContainer>
      <Paper
        sx={{
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: Colors.background,
          textAlign: "center",
          maxWidth: "600px",
          margin: "auto",
          marginTop: "5rem", // Added margin top
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: "1rem",
            color: Colors.primaryDark,
            fontWeight: 600,
          }}
        >
          Welcome,
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: Colors.primary,
            mb: "2rem",
            fontWeight: 500,
          }}
        >
          {email}
        </Typography>
        <Box mt="2rem">
          <Button
            variant="contained"
            onClick={handleBookingHistory}
            sx={{
              backgroundColor: Colors.secondary,
              "&:hover": {
                backgroundColor: Colors.secondaryDark,
              },
              mb: "1rem",
            }}
          >
            Go to Booking History
          </Button>
        </Box>
        <Box mt="2rem">
          <MyButton
            variant="contained"
            onClick={() => dispatch(removeUser())}
            endIcon={<Logout />}
            aria-label="Sign out"
            sx={{
              backgroundColor: Colors.secondary,
              "&:hover": {
                backgroundColor: Colors.secondaryDark,
              },
            }}
          >
            Sign out
          </MyButton>
        </Box>
      </Paper>
    </PageContainer>
  ) : (
    <Navigate to="/login" />
  );
};

export default AccountPage;
