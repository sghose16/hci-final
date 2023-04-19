import React, { useEffect, useState } from "react";

import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { getDatabase, get, ref, child } from "firebase/database";
import { getAuth } from "firebase/auth";
import FilterButtons from "../../components/FilterButtons";
import filterItems from "../../utils/ItemsUtils";
import FilterDialog from "../../components/FilterDialog";

function CreateOutfitItemSelector(props) {
  const [selected, setSelected] = useState([...props.selected]);
  const [currOutfits, setCurrOutfits] = useState([]);



  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const [favorite, showFavorites] = useState(false);
  const [brand, showBrand] = useState([]);
  const [tags, showTag] = useState([]);

  const [filter, setFilter] = useState(false);

  const defaultFilterLabel = {};
  const [filterLabel, setFilterLabel] = useState({});
  const [allOutfits, setAllOutfits] = useState([]);


  // used to determine whether we display the confirm button
  const originalSelectedJSON = JSON.stringify(props.selected);

  const resetAll = () => {
    showBrand("");
    showTag("");
    setFilterLabel(defaultFilterLabel);
    setFilter(false);
    showFavorites(false);
  };

  const handleBrandChange = (event) => {
    showBrand(event);
    setFilter(true);
    setFilterLabel((prevFilterLabel) => ({
      ...prevFilterLabel,
      brand: event,
    }));
  };

  const handleFavoriteChange = (event) => {
    setFilterLabel((prevFilterLabel) => ({
      ...prevFilterLabel,
      favorite: true, // Make sure to spread the previous stuff so it doesn't get overwritten
    }));
    setFilter(true);
    showFavorites(!favorite);
  };

  const handleTagsChange = (event) => {
    showTag(event);
    setFilter(true);
    setFilterLabel((prevFilterLabel) => ({
      ...prevFilterLabel,
      tags: event,
    }));
  };

  const handleDeleteFilter = (key, value) => {
    const updatedDictionary = { ...filterLabel };
    if (key === "favorite") {
      delete updatedDictionary.favorite;
    } else {
      const indexToRemove = updatedDictionary[key].indexOf(value);
      const updatedValue = updatedDictionary[key].filter(
        (item, index) => index !== indexToRemove
      );
      // Update the dictionary with the new value
      updatedDictionary[key] = updatedValue;
      if (key === "brand" && updatedDictionary[key].length == 0) {
        delete updatedDictionary.brand;
      } else if (key === "tags" && updatedDictionary[key].length == 0) {
        delete updatedDictionary.tags;
      }
    }
    setFilterLabel(updatedDictionary);
  };


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
          setCurrOutfits(Object.values(snapshot.val()));
          setAllOutfits(Object.values(snapshot.val()));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderItems = () => {
    if (currOutfits.length === 0) {
      return <p>{`No ${props.type} found.`}</p>;
    }
    return currOutfits.map((item, index) => {
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

    /* No calls to backend just filter out displayed items from all items */
    useEffect(() => {
      if (filter) {
        // console.log("filter label");
        // console.log(filterLabel);
        let listItems = filterItems(allOutfits, filterLabel);
        setCurrOutfits(listItems);
      } else {
        setCurrOutfits(allOutfits);
      }
      if (Object.keys(filterLabel).length == 0) {
        setFilter(false);
      }
    }, [filterLabel]);

  useEffect(() => {
    getItems();
  }, []);

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


          {/* Filter dialog */}
          <Grid item xs={4} sx={{ textAlign: "end" }}>
        <Button variant="outlined" onClick={() => setIsFilterDialogOpen(true)}>
          Filter
        </Button>
        <FilterDialog
          open={isFilterDialogOpen}
          handleClose={() => setIsFilterDialogOpen(false)}
          handleBrand={handleBrandChange}
          handleTags={handleTagsChange}
          handleFavorite={handleFavoriteChange}
          isOutfits = {false}
        />
      </Grid>

      <Grid item xs={8}>
        <IconButton>{filter ? <FilterButtons filterLabel = {filterLabel}
                       handleDeleteFilter = {handleDeleteFilter}/>
                   : null}
                       </IconButton>
      </Grid>

      <Grid item xs={4}>
        <IconButton>
          {filter ? (
            <Button variant="contained" onClick={resetAll}>
              {" "}
              RESET{" "}
            </Button>
          ) : null}
        </IconButton>
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
