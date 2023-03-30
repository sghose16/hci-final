import { useNavigate } from "react-router-dom";
import React from "react";
import { Button, Box } from "@mui/material";
import logo from "../assets/logo.png";

const Home = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    console.log("going to login");
    navigate("/login");
  };

  return (
    <>
      <div className="home">
        <img src={logo} />

        <p>Welcome to pocket!</p>

        <Button size="small" variant="contained" onClick={handleSignUp}>
          Sign Up
        </Button>

        <Button size="small" variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </>
  );
};

export default Home;
