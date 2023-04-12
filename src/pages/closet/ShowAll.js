import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Container, Grid, IconButton, Box, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getDatabase, get, ref, child, set, remove,  query, orderByChild, equalTo} from "firebase/database";
import { getAuth } from "firebase/auth";
import { auth, database} from "../../firebase";

import ViewItemDialogContainer from "../../components/ViewItemDialogContainer";
import FilterDialog from "../../components/FilterDialog";

import CloseIcon from '@mui/icons-material/Close';


function ShowAll(props) {
  const [items, setItems] = useState([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const [index, setIndex] = useState(0);
  
  const [favorite, showFavorites] = useState(false);
  const [brand, showBrand] = useState("");
  const [tags, showTag] = useState("");

  const [filter, setFilter] = useState(false);

  const defaultFilterLabel = {};
  const [filterLabel, setFilterLabel] = useState({});

  const [all, setAll] = useState([]);

  const handleDeleteFilter = (key, value) => {
    if (key === "brand"){
      let newDict = { ...filterLabel };
      delete newDict.brand;
      setFilterLabel(newDict);
    }else if (key === "tags"){
      let newDict = { ...filterLabel };
      delete newDict.tags;
      setFilterLabel(newDict);
    }else if (key === "favorite"){
      let newDict = { ...filterLabel };
      delete newDict.favorite;
      setFilterLabel(newDict);
    }
    if (Object.keys(filterLabel).length == 1){
      setFilter(false);
    }
  };

  const resetAll = () => {
    showBrand("");
    showTag("");
    setFilterLabel(defaultFilterLabel);
    setFilter(false);
    showFavorites(false);
  }

  const handleBrandChange = (event) => {
    showBrand(event);
    setFilter(true);
    setFilterLabel(prevFilterLabel => ({
      ...prevFilterLabel,
      brand: event
    }));
  };

  const handleFavoriteChange = (event) => {
    console.log("in handle favor" + event);
    setFilterLabel(prevFilterLabel => ({
      ...prevFilterLabel,
      favorite: true// Make sure to spread the previous stuff so it doesn't get overwritten
    }));
    setFilter(true);
    showFavorites(!favorite);
  }

  const handleTagsChange = (event) => {
    showTag(event);
    setFilter(true);
    setFilterLabel(prevFilterLabel => ({
      ...prevFilterLabel,
      tags: event
    }));
  };

  function tagsMatching(itemTags, targetTag){
    if (itemTags !== undefined){
      for (let j = 0; j < itemTags.length; j++){
        if (itemTags[j] === targetTag){
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
      while (match && j < keys.length){
        let key = keys[j];
        if (key === "brand"){
          match = item[key].toLowerCase().trim() ===  filterLabel[key].toLowerCase().trim();
        }else if (key === "favorite"){
          match = item[key] ===  filterLabel[key];
        }else{
          match = tagsMatching(item[key], filterLabel[key]);
        }
         j++;
        }
        if (match){
          filteredItems.add(item);
        }
    
     }
     return Array.from(filteredItems);
  }


  const getItems = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const itemsRef = ref(database, `users/${userId}/items/${props.type}`);
    get(itemsRef).then((snapshot) => {
      console.log("call to backend in get");
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
    get(child(dbRef, `users/${userId}/items/${props.type}`)).then(
      (snapshot) => {
        console.log("call to backend in delete");

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
                `users/${userId}/items/${props.type}/${indexToDelete}`
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
    get(child(dbRef, `users/${userId}/items/${props.type}`)).then(
      (snapshot) => {
        console.log("call to backend in save");

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
                `users/${userId}/items/${props.type}/${indexToUpdate}`
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

    setItems(
      items.map((i) => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      })
    );

    setAll(
      all.map((i) => {
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
    if (filter){
      console.log(filterLabel);
      let listItems = filterItems();
      setItems(listItems);
    }else{
      //console.log(filterLabel);
      setItems(all);
    }
  }, [filterLabel]);

  /* Doing the backend call the first  time and getting all items */
  useEffect(() => {
    getItems();
  }, []);

  const buttonsFiltering = Object.entries(filterLabel).map(([key, value]) => {
      if (key === "brand" && value !== "") {
        return (
          <Button key={key} variant="outlined" color="secondary" onClick={() => handleDeleteFilter(key, value)}>
            {`Brand: ${value} `}
            <CloseIcon />
          </Button>
        );
      } else if (key === "tags" && value !== "") {
        return (
          <Button key={key} variant="outlined" color="secondary" onClick={() => handleDeleteFilter(key, value)}>
            {`Tag: ${value} `}
            <CloseIcon />
          </Button>
        );
      } else if (key === "favorite" && value !== false){
        return (
          <Button key={key} variant="outlined" color="secondary" onClick={() => handleDeleteFilter(key, value)}>
            {`Favorites`}
            <CloseIcon />
          </Button>
        );

      }else {
        return null;
      }
    });

  

  const renderItems = () => {
    if (items.length === 0) {
      return <div>No {props.type} found.</div>;
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
      <Grid container>
        <Grid item>
          <Link to="/closet" style={{ textDecoration: "none" }}>
            <Button startIcon={<ArrowBackIosNew />}>Back</Button>
          </Link>
        </Grid>
      </Grid>

      {/* title of page */}
      <Grid container spacing={2}>
        <Grid item>
          <h1>{getTitle(props.type)}</h1>
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
              handleBrand = {handleBrandChange}
              handleTags = {handleTagsChange}
              handleFavorite = {handleFavoriteChange}
            />
          </Grid>

         {/* if filter is true then put what filtering by with an x */}
          <Grid item xs={8}>
            <IconButton >
               {filter ? buttonsFiltering : null }  

            </IconButton>
          </Grid>


          <Grid item xs={4} >
            <IconButton >
              {filter ? (
              <Button variant="contained" onClick={resetAll}> RESET </Button>) : 
                null }
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
