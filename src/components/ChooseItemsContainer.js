import { Box, Button, Divider, Grid, IconButton } from "@mui/material";
import React, { useState } from "react";

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
            <h2 className="capitalize">{props.type}</h2>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              onClick={() => {
                props.onClickCategory();
              }}
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
        <Grid container columns={1}>
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
