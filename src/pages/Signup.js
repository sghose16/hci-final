import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword,  getAuth, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { Container, Box, Paper, TextField, Button, Link, Typography } from "@mui/material";


const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user);

        const auth = getAuth();
        updateProfile(auth.currentUser, {
        displayName: name
            }).then(() => {
                console.log("name updated " + user.displayName)
        }).catch((error) => {
            console.log("error")
        });
        navigate("/login")
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  }



return (
  <main>
    <section>
      <div className="App">
      <Box
        height="calc(100vh - 56px)"
        display="flex"
        justifyContent="center"
        alignItems="center">
        <Container maxWidth="xs">
          <Box my={4}>
            <Paper elevation={3}>
              <Box p={3}>
              <Typography variant="h5" textAlign="center" gutterBottom>
                Sign Up
              </Typography>
                <form>

                  <TextField
                      label="Name"
                      type="name"
                      required
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      onChange={(e) => setName(e.target.value)}
                    />
                    
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
                    onClick={onSubmit}
                  >
                    Sign up
                  </Button>
                </form>

                <Box my={2}>
                  <Typography align="center">
                    Already have an account?{" "}
                    <Link component={NavLink} to="/login">
                      Log In
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Container>
        </Box>

      </div>
    </section>
  </main>
);
};

export default Signup
