import React from "react";
import { Link } from "react-router-dom";
import Register from "../components/Register";
import { Container, Typography, Paper, Divider } from "@mui/material";
import { PageContainer } from "../styles/page/containers";

const RegisterPage = () => {
  return (
    <PageContainer>
      <Paper
        elevation={3}
        sx={{ width: "20rem", margin: "0 auto", padding: "2.5rem 2rem",marginTop: "5rem" ,background: "linear-gradient(to bottom,  #fb923c, #fdba74, #fed7aa)"  }}
      >
        <Typography variant="h4" mb="1rem">
          Register
        </Typography>
        <Register />
        <Divider textAlign="center" />
        <Typography variant="subtitle1" mt="2rem">
          Already have an account?
          <Link to="/login"> Login</Link>
        </Typography>
      </Paper>
    </PageContainer>
  );
};

export default RegisterPage;
