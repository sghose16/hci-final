import settings from "../assets/settings.png";
import { useNavigate } from "react-router-dom";

import { Container, Grid, Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ViewOutfitDialog from "../components/ViewOutfitDialog";

import React, { useEffect, useState } from "react";

import { auth, database} from "../firebase";
import { getDatabase, get, ref, child, query, orderByChild, equalTo } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
    const favoriteOutfitsQuery = query(outfitsRef, orderByChild("favorite"), equalTo(true));

    get(favoriteOutfitsQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const favoriteOutfits = Object.values(snapshot.val());
        setOutfits(favoriteOutfits);
      }
    }).catch((error) => {
      console.log(error);
    });

  };
  

  const renderOutfits = outfits.map((fit, index) => {
    const flatItems = () => {
      let result = [];
      const itemArray = Object.values(fit["items"]);

      itemArray.forEach((arr) => {
        result.push(...arr);
      });

      return result.slice(0, 4);
    };
  

    return (
      <Grid item xs={6} key={index}>
        <div
          onClick={() => {
            setIndex(index);
            setOpen(true);
          }}
        >
          <ImageList
            sx={{ border: 1, borderColor: "grey.500" }}
            cols={2}
            gap={0}
          >
            {flatItems().map((item) => (
              <ImageListItem key={item["id"]}>
                <div className="img-container">
                  <img
                    src={item["img"]}
                    className="img-square"
                    alt={`tags: ${item["tags"]}`}
                  />
                </div>
              </ImageListItem>
            ))}
          </ImageList>
          <h3>{fit["name"]}</h3>
        </div>
      </Grid>
    );
  });


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
    <>
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
        <img src={img} style={{ width: '250px', height: '250px', borderRadius: '50%' }} />
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
        <div className="name"> {name} </div>
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
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {outfits.length === 0 ? (
          <p>No outfits found.</p>
        ) : (
          <>
            <ViewOutfitDialog
              open={open}
              index={index}
              items={outfits}
              handleClose={() => setOpen(false)}
              handleDelete={() => setOpen(false)}
            />
            {renderOutfits}
          </>
        )}
      </Grid>
      </Box>
    </Container>
    </>
  );
}

export default Profile;
