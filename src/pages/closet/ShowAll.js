import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Container, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getDatabase, get, ref, child, set, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import ViewItemDialogContainer from "../../components/ViewItemDialogContainer";

function ShowAll(props) {
  const [items, setItems] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const getItems = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${userId}/items/${props.type}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setItems(Object.values(snapshot.val()));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleDelete = (item) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    // get ref to item with item.id
    get(child(dbRef, `users/${userId}/items/${props.type}`)).then(
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
    setIsDialogOpen(false);
  };

  const handleSave = (item) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    // get ref to item with item.id
    get(child(dbRef, `users/${userId}/items/${props.type}`)).then(
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

    // update the item in the state
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

  useEffect(() => {
    getItems();
  }, []);

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
      <Grid container>
        <Grid item>
          <h1>{getTitle(props.type)}</h1>
        </Grid>
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
