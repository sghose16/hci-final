import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Link,
  Typography,
} from "@mui/material";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import banner from "../assets/banner-transparent.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snack, setSnack] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(location.state) {
      setSnack(true)
    }
  }, [location.state]);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/profile", {state:{message: `Successfully Logged In!`, variant: 'success'}});
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleClose = () => {
    setSnack(false);
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
      <Snackbar
        key={Slide.name}
        open={snack}
        autoHideDuration={1500}
        onClose={handleClose}
        TransitionProps={Slide}
       >
        <MuiAlert elevation={20} variant="filled" onClose={handleClose} severity={location.state ? location.state.variant : undefined} sx={{ width: '100%' }} >
        { location.state ? location.state.message: undefined}
        </MuiAlert>
       </Snackbar>
    </Container>
  );
};

export default Login;
