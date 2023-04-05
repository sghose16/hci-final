import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Grid } from "@mui/material";

import banner from "../assets/banner-transparent.png";

export const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (userCredential) => {
      console.log(userCredential);
      if (userCredential) {
        console.log("setting...");
        setIsLoggedIn(true);
      }
      setIsCheckingStatus(false);
    });
  }, []);

  if (!isCheckingStatus) {
    if (isLoggedIn) {
      return children;
    }
    return <Navigate to="/login" />;
  }

  return (
    <Container className={"home"}>
      <Box
        height="calc(100vh - 56px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container justifyContent={"center"}>
          <Grid item>
            <img src={banner} />
          </Grid>
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
