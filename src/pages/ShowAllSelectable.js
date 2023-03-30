import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { tops, bottoms, footwear, accessories } from "../data/data.js";

function ShowAllSelectable(props) {
  const [select, setSelected] = useState(-1);

  console.log(select);
  const items = () => {
    let items;

    switch (props.type) {
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

    return items.map((item, index) => {
      return (
        <ToggleButton
          className="img-container"
          value={index}
          onClick={() => setSelected(index)}
          sx={{ height: "100%", width: "100%" }}
          key={index}
        >
          <img src={item["img"]} className="img-square" />
        </ToggleButton>
      );
    });
  };

  return (
    <Container>
      {/* back button */}
      <Grid container>
        <Grid item>
          <Link to="/create-outfit">
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
      <ToggleButtonGroup
        value={select}
        exclusive
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(3, 1fr)",
          rowGap: 3,
          columnGap: 3,
        }}
      >
        {items()}
      </ToggleButtonGroup>
    </Container>
  );
}

function getTitle(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default ShowAllSelectable;
