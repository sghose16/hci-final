import React from "react";
import { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import { Container, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ViewOutfitDialog from "../../components/ViewOutfitDialog";

import { getDatabase, get, ref, child, set } from "firebase/database";
import { getAuth } from "firebase/auth";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function Outfit() {
  const [open, setOpen] = useState(false);
  const [outfits, setOutfits] = useState([]);
  const [index, setIndex] = useState(0);
  const [snack, setSnack] = useState(false);
  const navigate = useLocation();

  const getOutfits = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/outfits`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setOutfits(Object.values(snapshot.val()));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    setSnack(false);
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
          <h3 className="outfit-name-grid">{fit["name"]}</h3>
        </div>
      </Grid>
    );
  });

  useEffect(() => {
    getOutfits();
    if(navigate.state) {
      setSnack(true)
    }
  }, []);

  return (
    <Container>
      {/* title of page */}
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid container item xs={6} justifyContent={"flex-start"}>
          <h1>Outfits</h1>
        </Grid>
        <Grid container item xs={6} justifyContent={"flex-end"}>
          <Link to="/create-outfit" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Add</Button>
          </Link>
        </Grid>
      </Grid>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {outfits.length === 0 ? (
          <p style={{ paddingLeft: "8px" }}>No outfits found.</p>
        ) : (
          <>
            <ViewOutfitDialog
              open={open}
              index={index}
              items={outfits}
              handleClose={() => setOpen(false)}
              handleSave={saveItem}
            />
            {renderOutfits}
          </>
        )}
      </Grid>

      <Snackbar
        key={Slide.name}
        open={snack}
        autoHideDuration={1500}
        onClose={handleClose}
        TransitionProps={Slide}
       >
        <MuiAlert elevation={20} variant="filled" onClose={handleClose} severity={navigate.state ? navigate.state.variant : undefined} sx={{ width: '100%' }} >
        { navigate.state ? navigate.state.message: undefined}
        </MuiAlert>
       </Snackbar>
    </Container>
  );
}

export default Outfit;
