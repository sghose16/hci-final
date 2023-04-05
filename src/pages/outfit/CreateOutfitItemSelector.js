import React, { useEffect, useState } from "react";

import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { getDatabase, get, ref, child } from "firebase/database";
import { getAuth } from "firebase/auth";

function CreateOutfitItemSelector(props) {
  const [selected, setSelected] = useState([...props.selected]);
  const [allItems, setAllItems] = useState([]);
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

  const getItems = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    const category = props.type;

    get(child(dbRef, `users/${userId}/items/${category}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAllItems(Object.values(snapshot.val()));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderItems = () => {
    if (allItems.length === 0) {
      return <p>{`No ${props.type} found.`}</p>;
    }
    return allItems.map((item, index) => {
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

  useEffect(() => {
    getItems();
  });

  return (
    <>
      {/* back button */}
      <Grid container mt={2}>
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
        {renderItems()}
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
