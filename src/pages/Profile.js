import { Settings } from "@mui/icons-material";
import { Box, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png";
import DisplayOutfitsContainer from "../components/DisplayOutfitsContainer";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  child,
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
  set,
} from "firebase/database";
import { auth, database } from "../firebase";

import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";

function Profile() {
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [snack, setSnack] = useState(false);

  const location = useLocation();
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
    if (location.state) {
      setSnack(true);
    }
  }, [location.state]);

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

  const handleClose = () => {
    setSnack(false);
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

          // so that the settings button fits perfectly on the top right
          marginRight: "0px",
          paddingRight: "0px",
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
        <div className="img-container" style={{ width: "250px" }}>
          {img == null ? (
            <img
              src={avatar}
              className="img-square"
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <img
              src={img}
              className="img-square"
              style={{ borderRadius: "50%" }}
            />
          )}
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
        <h1 className={"name"}>{name}</h1>
      </Box>

      <DisplayOutfitsContainer outfits={outfits} handleSave={saveItem} />
      <Snackbar
        key={Slide.name}
        open={snack}
        autoHideDuration={1500}
        onClose={handleClose}
        TransitionProps={Slide}
      >
        <MuiAlert
          elevation={20}
          variant="filled"
          onClose={handleClose}
          severity={location.state ? location.state.variant : undefined}
          sx={{ width: "100%" }}
        >
          {location.state ? location.state.message : undefined}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default Profile;
