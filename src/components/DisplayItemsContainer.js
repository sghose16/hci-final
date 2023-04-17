import React, { useState, useEffect } from "react";
import { Box, Button, Divider, Grid, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link } from "react-router-dom";

import ViewItemDialogContainer from "./ViewItemDialogContainer";
import AddItemDialog from "./AddItemDialog";

import {
  getDatabase,
  get,
  push,
  ref,
  child,
  remove,
  set,
} from "firebase/database";
import { getAuth } from "firebase/auth";

import "../css/ItemsContainer.css";

function DisplayItemsContainer(props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const category = props.title.toLowerCase();

  const getItems = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${userId}/items/${category}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setItems(Object.values(snapshot.val()));
        } else {
          setItems([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addItem = (item) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    push(child(dbRef, `users/${userId}/items/${category}`), item)
      .then(() => {
        console.log("Push succeeded.");
      })
      .catch((error) => {
        console.log("Push failed: " + error.message);
      });

    setItems([...items, item]);
    setOpen(false);
  };

  const deleteItem = (item) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    // get ref to item with item.id
    get(child(dbRef, `users/${userId}/items/${category}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const allItems = snapshot.val();
        // find the index of the item to delete
        const indexToDelete = Object.keys(allItems).find(
          (key) => allItems[key].id === item.id
        );
        if (indexToDelete) {
          // delete the item from the database
          remove(
            child(dbRef, `users/${userId}/items/${category}/${indexToDelete}`)
          )
            .then(() => {
              console.log("Item deleted successfully");
            })
            .catch((error) => {
              console.log("Error deleting item:", error.message);
            });
        }
      }
    });

    // delete the item from the state
    setItems(items.filter((i) => i.id !== item.id));
  };

  const saveItem = (item) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    // get ref to item with item.id
    get(child(dbRef, `users/${userId}/items/${category}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const allItems = snapshot.val();
        // find the index of the item to update
        const indexToUpdate = Object.keys(allItems).find(
          (key) => allItems[key].id === item.id
        );
        if (indexToUpdate) {
          // update the item in the database
          set(
            child(dbRef, `users/${userId}/items/${category}/${indexToUpdate}`),
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
    });

    // update the item in the state
    setItems(
      items.map((i) => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      })
    );
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Box className="items-container">
      {/* header */}
      <div className="container-header">
        <Grid container spacing={2} columns={16} alignItems={"center"}>
          <Grid item xs={12}>
            <h2 style={{ textTransform: "capitalize" }}>{props.title}</h2>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "end" }}>
            <Button
              variant="outlined"
              onClick={() => setOpen(true)}
              className={"gray-circle-btn"}
            >
              Add
            </Button>
            <AddItemDialog
              type={props.title}
              open={open}
              handleClose={() => setOpen(false)}
              handleAdd={addItem}
            />
          </Grid>
        </Grid>
      </div>

      <Divider variant="middle" />

      {/* display corresponding items */}
      {isExpanded ? (
        <ItemsCarousel
          items={items}
          title={props.title}
          handleDelete={deleteItem}
          handleSave={saveItem}
        />
      ) : null}

      {/* handle expanding and minimizing */}
      <div>
        <Grid container columns={1} justifyContent={"center"}>
          <Grid item>
            <IconButton
              aria-label={`Expand ${isExpanded ? "less" : "more"} to view ${
                props.title
              }`}
              component="label"
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

function ItemsCarousel(props) {
  // only show first 5 items
  let numItems = props.items.length > 5 ? 5 : props.items.length;

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!props.items || props.items.length === 0) {
    return (
      <div className="no-items-text">No {props.title.toLowerCase()} found.</div>
    );
  }

  const handleDelete = (item) => {
    props.handleDelete(item);
    setOpen(false);
  };

  const handleSave = (item) => {
    props.handleSave(item);
  };

  return (
    <Box className="carousel-container">
      <ViewItemDialogContainer
        open={open}
        item={props.items[index]}
        handleSave={handleSave}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
      />
      {props.items.slice(0, numItems).map((item, index) => {
        return (
          <div
            className="img-container item-carousel"
            key={item["id"]}
            onClick={() => {
              setIndex(index);
              setOpen(true);
            }}
          >
            <img src={item["img"]} className="img-square" />
          </div>
        );
      })}
      <div
        style={{
          display: "inline-block",
        }}
      >
        <Link
          to={`/all/${props.title.toLowerCase()}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            aria-label={`See more ${props.title}`}
            onClick={() => {}}
            className={"gray-circle-btn"}
          >
            See more
          </Button>
        </Link>
      </div>
    </Box>
  );
}

export default DisplayItemsContainer;
