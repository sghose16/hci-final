import React from "react";
import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { Container, Grid, Button, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ViewOutfitDialog from "../../components/ViewOutfitDialog";

import { getDatabase, get, ref, child, set } from "firebase/database";
import { getAuth } from "firebase/auth";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import FilterButtons from "../../components/FilterButtons";
import FilterDialog from "../../components/FilterDialog";
import filterItems from "../../utils/ItemsUtils";

function Outfit() {
  const [open, setOpen] = useState(false);
  const [outfits, setOutfits] = useState([]);
  const [snack, setSnack] = useState(false);
  const navigate = useLocation();
  const [index, setIndex] = useState(-1);

  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const [favorite, showFavorites] = useState(false);
  const [brand, showBrand] = useState([]);
  const [tags, showTag] = useState([]);

  const [filter, setFilter] = useState(false);

  const defaultFilterLabel = {};
  const [filterLabel, setFilterLabel] = useState({});

  const [all, setAll] = useState([]);

  const resetAll = () => {
    showBrand("");
    showTag("");
    setFilterLabel(defaultFilterLabel);
    setFilter(false);
    showFavorites(false);
  };

  const handleFavoriteChange = (event) => {
    setFilterLabel((prevFilterLabel) => ({
      ...prevFilterLabel,
      favorite: true, // Make sure to spread the previous stuff so it doesn't get overwritten
    }));
    setFilter(true);
    showFavorites(!favorite);
  };

  const handleTagsChange = (event) => {
    showTag(event);
    setFilter(true);
    setFilterLabel((prevFilterLabel) => ({
      ...prevFilterLabel,
      tags: event,
    }));
  };

  const handleDeleteFilter = (key, value) => {
    const updatedDictionary = { ...filterLabel };
    if (key === "favorite") {
      delete updatedDictionary.favorite;
    } else {
      const indexToRemove = updatedDictionary[key].indexOf(value);
      const updatedValue = updatedDictionary[key].filter(
        (item, index) => index !== indexToRemove
      );
      // Update the dictionary with the new value
      updatedDictionary[key] = updatedValue;
      if (key === "brand" && updatedDictionary[key].length == 0) {
        delete updatedDictionary.brand;
      } else if (key === "tags" && updatedDictionary[key].length == 0) {
        delete updatedDictionary.tags;
      }
    }
    setFilterLabel(updatedDictionary);
  };

  const getOutfits = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/outfits`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setOutfits(Object.values(snapshot.val()));
          setAll(Object.values(snapshot.val()));
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

    // update the outfit in the state
    setAll(
      all.map((i) => {
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
    if (navigate.state) {
      setSnack(true);
    }
  }, []);

  /* No calls to backend just filter out displayed items from all items */
  useEffect(() => {
    if (Object.keys(filterLabel).length == 0) {
      setFilter(false);
      setOutfits(all);
    } else if (filter) {
      let listItems = filterItems(all, filterLabel);
      setOutfits(listItems);
    } else {
      setOutfits(all);
    }
  }, [filterLabel]);

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

      {/* Filter dialog */}
      <Grid container direction="row" justifyContent={"flex-end"}>
        <Grid item sx={{ textAlign: "end" }}>
          <Button
            variant="outlined"
            onClick={() => setIsFilterDialogOpen(true)}
          >
            Filter
          </Button>
          <FilterDialog
            open={isFilterDialogOpen}
            handleClose={() => setIsFilterDialogOpen(false)}
            handleTags={handleTagsChange}
            handleFavorite={handleFavoriteChange}
            isOutfits={true}
          />
        </Grid>
      </Grid>

      <Box display="flex" flexWrap="wrap" marginTop={1}>
        {filter ? (
          <FilterButtons
            filterLabel={filterLabel}
            handleDeleteFilter={handleDeleteFilter}
          />
        ) : null}
      </Box>

      <Grid
        container
        direction="row"
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <Grid item>
          <IconButton>
            {filter ? (
              <Button variant="contained" onClick={resetAll}>
                RESET
              </Button>
            ) : null}
          </IconButton>
        </Grid>
      </Grid>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {outfits.length === 0 ? (
          <p style={{ paddingLeft: "8px" }}>No outfits found.</p>
        ) : (
          renderOutfits
        )}
        {index === -1 ? null : (
          <>
            <ViewOutfitDialog
              open={open}
              index={index}
              items={outfits}
              handleClose={() => {
                setOpen(false);
                setIndex(-1);
              }}
              handleSave={saveItem}
            />
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
        <MuiAlert
          elevation={20}
          variant="filled"
          onClose={handleClose}
          severity={navigate.state ? navigate.state.variant : undefined}
          sx={{ width: "100%" }}
        >
          {navigate.state ? navigate.state.message : undefined}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default Outfit;
