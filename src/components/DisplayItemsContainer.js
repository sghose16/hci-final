import React, { Component, useState } from "react";
import { Box, Button, Divider, Grid, IconButton } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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
        <div>
          <ItemsCarousel items={props.items} title={props.title} />
        </div>
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
  return (
    <div>
      {props.items.map((item) => {
        return <img src={item} key={item} />;
      })}
      <Button
        variant="outlined"
        aria-label={`See more ${props.title}`}
        onClick={null}
      >
        See more
      </Button>
    </div>
  );
}

export default DisplayItemsContainer;
