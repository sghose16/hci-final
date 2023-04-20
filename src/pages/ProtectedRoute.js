import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

import banner from "../assets/banner-transparent.png";

/**
 * handles determining whether the user is allowed to view a page
 * or not given their login status
 */
export const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (userCredential) => {
      // user is logged in!
      if (userCredential) {
        setIsLoggedIn(true);
      }
      // mark down that onAuthStateChanged has finished running
      setIsCheckingStatus(false);
    });
  }, []);

  // ensure onAuthStateChanged (async) has finished running
  if (!isCheckingStatus) {
    // user is logged in! take them to the page they want :)
    if (isLoggedIn) {
      return children;
    }
    // user is not logged in. make them log in
    return <Navigate to="/login" />;
  }

  // onAuthStateChanged has not finished running yet.
  // show progress spinner until it finishes running
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
