import { ArrowBackIosNew } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


import {
  getDatabase,
  get,
  ref,
  child,
  set,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { database } from "../../firebase";

import ViewItemDialogContainer from "../../components/ViewItemDialogContainer";
import FilterDialog from "../../components/FilterDialog";

import CloseIcon from "@mui/icons-material/Close";

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

  function brandMatching(itemBrand, targetBrands) {
    if (itemBrand !== undefined) {
      for (let j = 0; j < targetBrands.length; j++) {
        if (
          targetBrands[j].toLowerCase().trim() ===
          itemBrand.toLowerCase().trim()
        ) {
          return true;
        }
      }
    }
    return false;
  }

  function tagsMatching(itemTags, targetTags) {
    if (itemTags !== undefined) {
      for (let i = 0; i < itemTags.length; i++) {
        for (let j = 0; j < targetTags.length; j++)
          if (
            itemTags[i].toLowerCase().trim() ===
            targetTags[j].toLowerCase().trim()
          ) {
            return true;
          }
      }
    }
    return false;
  }

  function filterItems() {
    const filteredItems = new Set();

    for (let i = 0; i < all.length; i++) {
      const item = all[i];
      let match = true;
      let j = 0;
      let keys = Object.keys(filterLabel);
      while (match && j < keys.length) {
        let key = keys[j];
        if (key === "brand") {
          match = brandMatching(item[key], filterLabel[key]);
        } else if (key === "favorite") {
          match = item[key] === filterLabel[key];
        } else {
          match = tagsMatching(item[key], filterLabel[key]);
        }
        j++;
      }
      if (match) {
        filteredItems.add(item);
      }
    }
    return Array.from(filteredItems);
  }

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
    get(child(dbRef, `users/${userId}/items/${type}`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          const allItems = snapshot.val();
          // find the index of the item to delete
          const indexToDelete = Object.keys(allItems).find(
            (key) => allItems[key].id === item.id
          );
          if (indexToDelete) {
            // delete the item from the database
            remove(
              child(
                dbRef,
                `users/${userId}/items/${type}/${indexToDelete}`
              )
            )
              .then(() => {
                console.log("Item deleted successfully");
              })
              .catch((error) => {
                console.log("Error deleting item:", error.message);
              });
          }
        }
      }
    );

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
    get(child(dbRef, `users/${userId}/items/${type}`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          const allItems = snapshot.val();
          // find the index of the item to update
          const indexToUpdate = Object.keys(allItems).find(
            (key) => allItems[key].id === item.id
          );
          if (indexToUpdate) {
            // update the item in the database
            set(
              child(
                dbRef,
                `users/${userId}/items/${type}/${indexToUpdate}`
              ),
              item
            )
              .then(() => {
                console.log("Item updated successfully");
              })
              .catch((error) => {
                console.log("Error updating item:", error.message);
              });
          }
        }
      }
    );

    setAll(
      all.map((i) => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      })
    );
    let listItems = filterItems();
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
    if (filter) {
      // console.log("filter label");
      // console.log(filterLabel);
      let listItems = filterItems();
      setItems(listItems);
    } else {
      setItems(all);
    }
    if (Object.keys(filterLabel).length == 0) {
      setFilter(false);
    }
  }, [filterLabel]);

  /* Doing the backend call the first  time and getting all items */
  useEffect(() => {
    getItems();
  }, []);

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

  const buttonsFiltering = Object.entries(filterLabel).map(([key, value]) => {
    if (key === "brand" && value.length > 0) {
      return value.map((brand) => (
        <Button
          key={brand}
          variant="outlined"
          color="secondary"
          onClick={() => handleDeleteFilter(key, brand)}
        >
          {`Brand: ${brand} `}
          <CloseIcon />
        </Button>
      ));
    } else if (key === "tags" && value.length > 0) {
      return value.map((tag) => (
        <Button
          key={tag}
          variant="outlined"
          color="secondary"
          onClick={() => handleDeleteFilter(key, tag)}
        >
          {`Tag: ${tag} `}
          <CloseIcon />
        </Button>
      ));
    } else if (key === "favorite" && value !== false) {
      return (
        <Button
          key={key}
          variant="outlined"
          color="secondary"
          onClick={() => handleDeleteFilter(key, value)}
        >
          {`Favorites`}
          <CloseIcon />
        </Button>
      );
    } else {
      return null;
    }
  });

  const renderItems = () => {
    if (items.length === 0) {
      return <div>No {type} found.</div>;
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
      <Grid container  mt={2}>
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
        />
      </Grid>

      <Grid item xs={8}>
        <IconButton>{filter ? buttonsFiltering : null}</IconButton>
      </Grid>

      <Grid item xs={4}>
        <IconButton>
          {filter ? (
            <Button variant="contained" onClick={resetAll}>
              {" "}
              RESET{" "}
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
    </Container>
  );
}

function getTitle(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default ShowAll;
