import React from "react";
import Form from "./Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/user/UserSlice";
import { setBookings } from "../features/bookings/BookingSlice";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../firebase";
import { Button, Typography, Box } from "@mui/material";
import { Google } from "@mui/icons-material";
import { Colors } from "../styles/theme/theme";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid, // corrected to use uid instead of id
            token: user.accessToken,
          })
        );

        const userBookings = JSON.parse(localStorage.getItem(`bookings_${user.uid}`)) || [];
        dispatch(setBookings(userBookings));
        
        navigate("/");
      })
      .catch((error) => {
        alert("User Does not Exist!");
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        dispatch(
          setUser({
            email: user.email,
            id: user.uid, // corrected to use uid instead of id
            token: user.accessToken,
          })
        );

        const userBookings = JSON.parse(localStorage.getItem(`bookings_${user.uid}`)) || [];
        dispatch(setBookings(userBookings));

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box>
      <Form title="SIGN IN" handleClick={handleLogin} />
      
    </Box>
  );
};

export default Login;
