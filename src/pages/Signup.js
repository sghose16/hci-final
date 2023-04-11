import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, push, set } from "firebase/database";
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Link,
  Typography,
  IconButton,
  Input,
  InputAdornment
} from "@mui/material";
import settings from "../assets/settings.png"
import banner from "../assets/banner-transparent.png";
import { ref as refStorage } from "firebase/storage";
import app, { storage } from "../firebase";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");


    // Handle file upload event and update state
    function handleChange(event) {
      if (event.target.files.length > 0) {
        setFile(event.target.files[0]);
        setImageUrl(URL.createObjectURL(event.target.files[0]));
      }
    }
  
    async function uploadPicture(file) {
      const storageRef = refStorage(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Do nothing. This callback is used to listen to the progress of the upload.
          },
          (error) => {
            reject(error);
          },
          () => {
            resolve();
          }
        );
      });
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    }
  
    const handleUpload = async () => {
      if (!file) {
        alert("Please upload an image first!");
      }
      const downloadURL = await uploadPicture(file);
      return downloadURL;
    };
  


  const onSubmit = async (e) => {
    e.preventDefault();
    const image = await handleUpload();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user);

        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: image
        })
          .then(() => {
            console.log("name updated " + user.displayName);
            console.log("photo updated " + user.photoURL);

          })
          .catch((error) => {
            console.log("error");
          });

        // set default categories
        const categories = ["Tops", "Bottoms", "Shoes", "Accessories"];
        const userId = auth.currentUser.uid;
        const dbRef = ref(database, `users/${userId}/categories`);

        categories.forEach((category) => {
          const newCategoryRef = push(dbRef);
          set(newCategoryRef, { name: category });
        });

        navigate("/");
      })
      .catch((error) => {
        console.log(error.code, error.message);
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
                  Sign Up
                </Typography>
                <form>

                          {/* add image */}
        <Box sx={{ textAlign: "center" }}>
          <IconButton>
            <Box
              mb={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="150px"
              width="150px"
              border="2px dashed black"
            >
              <label htmlFor="upload-file">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="selected"
                    height="100%"
                    width="100%"
                  />
                ) : (
                 "Upload Profile Picture"
                )}
              </label>
            </Box>
          </IconButton>
          <Input
            id="upload-file"
            type="file"
            onChange={handleChange}
            style={{ display: "none" }}
            endAdornment={
              <InputAdornment position="end">
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </InputAdornment>
            }
          />
        </Box>

                  {/* Name */}
                  <TextField
                    label="Name"
                    type="name"
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                  />
                  {/* Email */}
                  <TextField
                    label="Email Address"
                    type="email"
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* Password */}
                  <TextField
                    label="Password"
                    type="password"
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                  />


                 {/* Submit */}
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
                      Log in
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

export default Signup;
