import React, { useState } from "react";

import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { tops, bottoms, footwear, accessories } from "../../data/data.js";

function CreateOutfitItemSelector(props) {
  const [selected, setSelected] = useState([...props.selected]);

  const handleSelectItem = (item) => {
    let newSelected;

    // check if item is already selected
    if (
      selected.includes((a) => {
        return a.id === item.id;
      })
    ) {
      // deleted selected item!
      newSelected = selected.filter((a) => a.id !== item.id);
    } else {
      // add selected item!
      selected.push(item);
      newSelected = [...selected];
    }

    setSelected(newSelected);
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
          sx={{ height: "100%", width: "100%" }}
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
      <Grid container>
        <Grid item>
          <Button
            startIcon={<ArrowBackIosNew />}
            onClick={() => props.onBack()}
          >
            Back
          </Button>
        </Grid>
      </Grid>

      {/* title of page */}
      <Grid container spacing={2} columns={16}>
        <Grid item xs={12}>
          <h1>{getTitle(props.type)}</h1>
        </Grid>
        <Grid item xs={4}>
          {selected.length !== 0 ? (
            <Button
              variant="outlined"
              onClick={() => props.onSave(selected, props.type)}
            >
              Confirm
            </Button>
          ) : null}
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
    </>
  );
}

function getTitle(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default CreateOutfitItemSelector;
