import { Box, Button, Divider, Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
import "../css/ItemsContainer.css";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

/**
 * display container of items in a given category. also allows deletion
 * @props   type: string of category
 *          selected: array of items in this category that have been selected
 *          onClickCategory: function that handles clicking "Choose" button
 *          onDeleteItem: function that handles deleting an item from outfit
 */
function ChooseItemsContainer(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box className="items-container">
      {/* header */}
      <div className="container-header">
        <Grid container spacing={2} columns={16} alignItems={"center"}>
          <Grid item xs={11}>
            <h2 className="capitalize">{props.type}</h2>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: "end" }}>
            <Button
              variant="outlined"
              onClick={() => {
                props.onClickCategory();
              }}
              className={"gray-circle-btn"}
            >
              Choose
            </Button>
          </Grid>
        </Grid>
      </div>

      <Divider variant="middle" />

      {/* display corresponding items */}
      {isExpanded ? (
        <div>
          <EditItemsCarousel
            selected={props.selected}
            onDeleteItem={props.onDeleteItem}
            type={props.type}
          />
        </div>
      ) : null}

      {/* handle expanding and minimizing */}
      <div>
        <Grid container columns={1} justifyContent={"center"}>
          <Grid item>
            <IconButton
              aria-label={`Expand ${isExpanded ? "less" : "more"} to view ${
                props.type
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
  if (!props.selected || props.selected.length === 0) {
    return <div className="no-items-text">No {props.type} added.</div>;
  }

  return (
    <div className="carousel-container">
      {props.selected.map((item, index) => {
        return (
          <EditItem
            item={item}
            onDelete={() => {
              props.onDeleteItem(item, props.type);
            }}
            key={`edit-items-carousel-${index}`}
          />
        );
      })}
    </div>
  );
}

function EditItem(props) {
  return (
    <div className="item-carousel">
      <Box>
        <div
          className="img-container"
          key={`edit-item-container-${props.item["id"]}`}
        >
          <img src={props.item["img"]} className="img-square" />
        </div>
      </Box>
      <IconButton
        aria-label={"Remove item"}
        component="label"
        onClick={props.onDelete}
        color="error"
      >
        <RemoveCircleIcon />
      </IconButton>
    </div>
  );
}

export default ChooseItemsContainer;
