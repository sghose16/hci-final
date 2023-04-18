import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Link,
  Typography,
} from "@mui/material";

import banner from "../assets/banner-transparent.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/profile");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Container className="home">
      <Box
        height="calc(100vh - 56px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Container maxWidth="xs">
          <img src={banner} />
          <Box my={1}>
            <Paper elevation={3}>
              <Box p={3}>
                <Typography variant="h5" textAlign="center" gutterBottom>
                  Log In
                </Typography>
                <form>
                  <TextField
                    label="Email Address"
                    type="email"
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <TextField
                    label="Password"
                    type="password"
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <Button
                    sx={{ mt: 1 }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onLogin}
                  >
                    Log in
                  </Button>
                </form>

                <Box my={2}>
                  <Typography align="center">
                    No account yet?{" "}
                    <Link component={NavLink} to="/signup">
                      Sign up
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default Login;
