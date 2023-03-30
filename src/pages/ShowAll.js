import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { tops, bottoms, footwear, accessories } from "../data/data.js";

function ShowAll(props) {
  return (
    <Container>
      {/* back button */}
      <Grid container>
        <Grid item>
          <Link to="/closet">
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
        {getItems(props.type)}
      </Grid>
    </Container>
  );
}

function getTitle(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function getItems(type) {
  let items;

  switch (type) {
    case "tops":
      items = tops;
      break;
    case "bottoms":
      items = bottoms;
      break;
    case "footwear":
      items = footwear;
      break;
    case "accessories":
      items = accessories;
      break;
    default:
      items = [];
  }

  return items.map((item) => {
    return (
      <Grid item xs={4} key={item["id"]}>
        <div className="img-container">
          <img src={item["img"]} className="img-square" />
        </div>
      </Grid>
    );
  });
}

export default ShowAll;
