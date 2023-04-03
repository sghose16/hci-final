import React, { useState } from "react";

import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { tops, bottoms, footwear, accessories } from "../../data/data.js";

function CreateOutfitItemSelector(props) {
  const [selected, setSelected] = useState([...props.selected]);
  // used to determine whether we display the confirm button
  const originalSelectedJSON = JSON.stringify(props.selected);

  const handleSelectItem = (item) => {
    let newSelected;

    // check if item is already selected
    if (selected.some((a) => a.id === item.id)) {
      // deleted selected item!
      newSelected = selected.filter((a) => a.id !== item.id);
    } else {
      // add selected item!
      selected.push(item);
      selected.sort((a, b) => {
        return a.id - b.id;
      });
      newSelected = [...selected];
    }

    setSelected(newSelected);
  };

  const isSelected = (item) => {
    return selected.some((a) => a.id === item.id);
  };

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
          onClick={() => handleSelectItem(item)}
          sx={{
            height: "100%",
            width: "100%",
            border: `black ${
              isSelected(item) ? "2px" : "0px"
            } solid !important`,
          }}
          key={`choose-item-${index}`}
        >
          <img src={item.img} className="img-square" />
        </ToggleButton>
      );
    });
  };

  return (
    <>
      {/* back button */}
      <Grid container mt={2}>
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosNew />}
            onClick={() => props.onBack()}
          >
            Back
          </Button>
        </Grid>
      </Grid>

      {/* title of page */}
      <Grid container spacing={2} columns={16}>
        <Grid item>
          <h1>{getTitle(props.type)}</h1>
        </Grid>
      </Grid>

      {/* all items under category */}
      <ToggleButtonGroup
        value={selected}
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

      {JSON.stringify(selected) !== originalSelectedJSON ? (
        <Grid container justifyContent={"center"} mt={2}>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => props.onSave(selected, props.type)}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}

function getTitle(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default CreateOutfitItemSelector;
