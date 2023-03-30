import React, { Component, useState } from "react";
import { Box, Button, Divider, Grid, IconButton } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link } from "react-router-dom";

function DisplayItemsContainer(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box>
      {/* header */}
      <div className="container-header">
        <Grid container spacing={2} columns={16}>
          <Grid item xs={12}>
            <h2>{props.title}</h2>
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined">Add</Button>
          </Grid>
        </Grid>
      </div>

      <Divider variant="middle" />

      {/* display corresponding items */}
      {isExpanded ? (
        <ItemsCarousel items={props.items} title={props.title} />
      ) : null}

      {/* handle expanding and minimizing */}
      <div>
        <Grid container columns={1}>
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

  return (
    <Box className="carousel-container">
      {props.items.slice(0, numItems).map((item) => {
        return (
          <div className="img-container img-carousel" key={item["id"]}>
            <img src={item["img"]} className="img-square" />
          </div>
        );
      })}
      <div
        style={{
          display: "inline-block",
        }}
      >
        <Link to={`/all-${props.title.toLowerCase()}`}>
          <Button
            variant="outlined"
            aria-label={`See more ${props.title}`}
            onClick={null}
          >
            See more
          </Button>
        </Link>
      </div>
    </Box>
  );
}

export default DisplayItemsContainer;
