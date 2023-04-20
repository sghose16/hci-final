import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, Button, Container, Grid, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";
import { database } from "../../firebase";

import FilterButtons from "../../components/FilterButtons";
import FilterDialog from "../../components/FilterDialog";
import ViewItemDialogContainer from "../../components/ViewItemDialogContainer";
import filterItems from "../../utils/ItemsUtils";

import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function ShowAll(props) {
  const { type } = useParams();
  const [items, setItems] = useState([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const [index, setIndex] = useState(0);

  const [favorite, showFavorites] = useState(false);
  const [brand, showBrand] = useState([]);
  const [tags, showTag] = useState([]);

  const [filter, setFilter] = useState(false);

  const defaultFilterLabel = {};
  const [filterLabel, setFilterLabel] = useState({});

  const [all, setAll] = useState([]);

  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const resetAll = () => {
    showBrand("");
    showTag("");
    setFilterLabel(defaultFilterLabel);
    setFilter(false);
    showFavorites(false);
  };

  const handleBrandChange = (event) => {
    showBrand(event);
    setFilter(true);
    setFilterLabel((prevFilterLabel) => ({
      ...prevFilterLabel,
      brand: event,
    }));
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

  const getItems = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const itemsRef = ref(database, `users/${userId}/items/${type}`);
    get(itemsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let listItems = Object.values(snapshot.val());
          setItems(listItems);
          setAll(listItems);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (item) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    // get ref to item with item.id
    get(child(dbRef, `users/${userId}/items/${type}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const allItems = snapshot.val();
        // find the index of the item to delete
        const indexToDelete = Object.keys(allItems).find(
          (key) => allItems[key].id === item.id
        );
        if (indexToDelete) {
          // delete the item from the database
          remove(child(dbRef, `users/${userId}/items/${type}/${indexToDelete}`))
            .then(() => {
              console.log("Item deleted successfully");
              setSnackPack((prev) => [
                ...prev,
                {
                  message: "Item Successfully Deleted!",
                  variant: "error",
                  key: new Date().getTime(),
                },
              ]);
            })
            .catch((error) => {
              console.log("Error deleting item:", error.message);
            });
        }
      }
    });

    // delete the item from the state
    setItems(items.filter((i) => i.id !== item.id));
    setAll(all.filter((i) => i.id !== item.id));

    setIsDialogOpen(false);
  };

  const handleSave = (item) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    // get ref to item with item.id
    get(child(dbRef, `users/${userId}/items/${type}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const allItems = snapshot.val();
        // find the index of the item to update
        const indexToUpdate = Object.keys(allItems).find(
          (key) => allItems[key].id === item.id
        );
        if (indexToUpdate) {
          // update the item in the database
          set(
            child(dbRef, `users/${userId}/items/${type}/${indexToUpdate}`),
            item
          )
            .then(() => {
              console.log("Item updated successfully");
              setSnackPack((prev) => [
                ...prev,
                {
                  message: "Item Successfully Updated!",
                  variant: "success",
                  key: new Date().getTime(),
                },
              ]);
            })
            .catch((error) => {
              console.log("Error updating item:", error.message);
            });
        }
      }
    });

    setAll(
      all.map((i) => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      })
    );
    let listItems = filterItems(all, filterLabel);
    setItems(
      items.map((i) => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      })
    );

    setIsDialogOpen(false);
  };

  /* No calls to backend just filter out displayed items from all items */
  useEffect(() => {
    if (Object.keys(filterLabel).length == 0) {
      setFilter(false);
      setItems(all);
    } else if (filter) {
      let listItems = filterItems(all, filterLabel);
      setItems(listItems);
    } else {
      setItems(all);
    }
  }, [filterLabel]);

  /* Doing the backend call the first  time and getting all items */
  useEffect(() => {
    getItems();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const renderItems = () => {
    if (items.length === 0) {
      return (
        <div style={{ paddingLeft: "10px", paddingTop: "15px" }}>
          No {type} found.
        </div>
      );
    }

    return items.map((item, index) => {
      return (
        <Grid item xs={4} key={item["id"]}>
          <div
            className="img-container"
            onClick={() => {
              setIndex(index);
              setIsDialogOpen(true);
            }}
          >
            <img src={item["img"]} className="img-square" />
          </div>
        </Grid>
      );
    });
  };

  return (
    <Container>
      {/* back button */}
      <Grid container mt={2}>
        <Grid item>
          <Link to="/closet" style={{ textDecoration: "none" }}>
            <Button startIcon={<ArrowBackIosNew />}>Back</Button>
          </Link>
        </Grid>
      </Grid>

      {/* title of page */}
      <Grid container spacing={2}>
        <Grid item>
          <h1>{getTitle(type)}</h1>
        </Grid>
      </Grid>

      {/* Filter dialog */}
      <Grid item xs={4} sx={{ textAlign: "end" }}>
        <Button variant="outlined" onClick={() => setIsFilterDialogOpen(true)}>
          Filter
        </Button>
        <FilterDialog
          open={isFilterDialogOpen}
          handleClose={() => setIsFilterDialogOpen(false)}
          handleBrand={handleBrandChange}
          handleTags={handleTagsChange}
          handleFavorite={handleFavoriteChange}
          isOutfits={false}
        />
      </Grid>

      <Box display="flex" flexWrap="wrap" marginTop={1}>
        {filter ? (
          <FilterButtons
            filterLabel={filterLabel}
            handleDeleteFilter={handleDeleteFilter}
          />
        ) : null}
      </Box>

      <Grid item xs={4}>
        <IconButton>
          {filter ? (
            <Button variant="contained" onClick={resetAll}>
              RESET
            </Button>
          ) : null}
        </IconButton>
      </Grid>

      {/* all items under category */}
      <Grid container spacing={2}>
        {renderItems()}
      </Grid>

      {/* dialog for displaying item info */}
      <ViewItemDialogContainer
        open={isDialogOpen}
        item={items[index]}
        handleSave={handleSave}
        handleClose={() => setIsDialogOpen(false)}
        handleDelete={handleDelete}
      />
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
      >
        <MuiAlert
          elevation={20}
          variant="filled"
          onClose={handleClose}
          severity={messageInfo ? messageInfo.variant : undefined}
          sx={{ width: "100%" }}
        >
          {messageInfo ? messageInfo.message : undefined}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

function getTitle(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default ShowAll;
