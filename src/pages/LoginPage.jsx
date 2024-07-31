import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Paper, Divider } from "@mui/material";
import Login from "../components/Login";
import { PageContainer } from "../styles/page/containers";
import { Colors } from "../styles/theme/theme";

const LoginPage = () => {
  return (
    <PageContainer>
      <Paper
        elevation={3}
        sx={{ width: "20rem", margin: "0 auto", padding: "2.5rem 2rem", marginTop: "5rem" ,background: "linear-gradient(to bottom,  #fb923c, #fdba74, #fed7aa)" }}
      >
        <Typography variant="h4" mb="1rem">
          Login
        </Typography>
        <Login />
        <Divider textAlign="center" />
        <Typography variant="subtitle1" mt="2rem">
          Don't have an account?{" "}
          <Link to="/register" sx={{ color: Colors.black }}>
            Sign up
          </Link>
        </Typography>
      </Paper>
    </PageContainer>
  );
};

export default LoginPage;
