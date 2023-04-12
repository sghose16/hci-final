import { useNavigate } from "react-router-dom";
import { Container, Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import DisplayOutfitsContainer from "../components/DisplayOutfitsContainer";
import { Settings } from "@mui/icons-material";

import { auth, database } from "../firebase";
import {
  get,
  ref,
  query,
  orderByChild,
  equalTo,
  getDatabase,
  child,
  set,
} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Profile() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [outfits, setOutfits] = useState([]);

  const navigate = useNavigate();

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

  const saveItem = (item) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    // get ref to item with item.id
    get(child(dbRef, `users/${userId}/outfits`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const allOutfits = snapshot.val();
          // find outfit to display

          const outfitKey = Object.keys(allOutfits).find(
            (key) => allOutfits[key].id === item["id"]
          );
          console.log("found outfit");

          set(child(dbRef, `users/${userId}/outfits/${outfitKey}`), item)
            .then(() => {
              console.log("Outfit updated successfully");
            })
            .catch((error) => {
              console.log("Error updating outfit: ", error.message);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // update the outfit in the state
    setOutfits(
      outfits.map((i) => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      })
    );
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
  }, [outfits]);

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
        {/* settings button */}
        <IconButton onClick={handleClick}>
          <Settings fontSize="large" />
        </IconButton>
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

      <DisplayOutfitsContainer outfits={outfits} handleSave={saveItem} />
    </Container>
  );
}

export default Profile;
