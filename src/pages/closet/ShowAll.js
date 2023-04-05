import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Container, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getDatabase, get, ref, child } from "firebase/database";
import { getAuth } from "firebase/auth";

function ShowAll(props) {
  const [items, setItems] = useState([]);

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
    return items.map((item) => {
      return (
        <Grid item xs={4} key={item["id"]}>
          <div className="img-container">
            <img src={item["img"]} className="img-square" />
          </div>
        </Grid>
      );
    });
  };

  useEffect(() => {
    getItems();
  });

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
    </Container>
  );
}

function getTitle(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default ShowAll;
