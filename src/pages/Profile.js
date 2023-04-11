import settings from "../assets/settings.png";
import { useNavigate } from "react-router-dom";

import { Container, Grid, Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ViewOutfitDialog from "../components/ViewOutfitDialog";

import React, { useEffect, useState } from "react";

import { auth, database } from "../firebase";
import {
  getDatabase,
  get,
  ref,
  child,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DisplayOutfitsContainer from "../components/DisplayOutfitsContainer";

function Profile() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [outfits, setOutfits] = useState([]);
  const [index, setIndex] = useState(0);

  const getOutfits = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const outfitsRef = ref(database, `users/${userId}/outfits`);
    const favoriteOutfitsQuery = query(
      outfitsRef,
      orderByChild("favorite"),
      equalTo(true)
    );

    get(favoriteOutfitsQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const favoriteOutfits = Object.values(snapshot.val());
          setOutfits(favoriteOutfits);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        //User is signed in
        const userName = userCredential.displayName;
        setName(userName);
        const image = userCredential.photoURL;
        setImg(image);
      } else {
        // User is signed out
        console.log("user is logged out");
      }
    });
    getOutfits();
  }, []);

  const handleClick = (event) => {
    navigate("/settings");
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          width: "auto",
          borderRadius: 1,
        }}
      >
        <div className="settings">
          <img src={settings} alt={settings} onClick={handleClick} />
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <img
          src={img}
          style={{ width: "250px", height: "250px", borderRadius: "50%" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <h1 className={"name"}>{name}</h1>
      </Box>

      <DisplayOutfitsContainer outfits={outfits} />
    </Container>
  );
}

export default Profile;
