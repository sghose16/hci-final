import { Box, Button, Divider, Grid, IconButton } from "@mui/material";
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function ChooseItemsContainer(props) {
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
          <Link to={`/all-selectable-${props.title.toLowerCase()}`}>
            <Button variant="outlined">Choose</Button>
          </Link >
          </Grid>
        </Grid>
      </div>

      <Divider variant="middle" />

      {/* display corresponding items */}
      {isExpanded ? (
        <div>
          <EditItemsCarousel
            selected={props.selected}
            // TODO: change
            onDeleteItem={(index) => {
              console.log(index);
            }}
          />
        </div>
      ) : null}

      {/* handle expanding and minimizing */}
      <div>
        <Grid container columns={1}>
          <Grid item>
            <IconButton
              aria-label={`Expand ${isExpanded ? "less" : "more"} to view ${props.title
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

function EditItemsCarousel(props) {
  return (
    <div>
      {props.selected.map((item, index) => {
        return (
          <EditItem
            item={item}
            onDelete={() => {
              props.onDeleteItem(index);
            }}
            key={item}
          />
        );
      })}
    </div>
  );
}

function EditItem(props) {
  return (
    <div>
      <Box>
        <div className="img-container" key={props.item}>
          <img src={props.item} className="img-square" />
        </div>
      </Box>
      <IconButton
        aria-label={"Remove item"}
        component="label"
        onClick={props.onDelete}
      >
        <RemoveCircleIcon />
      </IconButton>
    </div>
  );
}

export default ChooseItemsContainer;
