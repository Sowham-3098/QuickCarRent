import React from "react";
import Form from "./Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/user/UserSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        const userData = {
          email: user.email,
          id: user.uid, // corrected to use uid instead of id
          token: user.accessToken,
        };
        dispatch(setUser(userData));

        // Save user data to local storage
        localStorage.setItem("user", JSON.stringify(userData));

        navigate("/");
      })
      .catch(() => alert("Incorrect Data Entered!"));
  };

  return (
    <>
      <Form title="SIGN UP" handleClick={handleRegister} />
    </>
  );
};

export default Register;
