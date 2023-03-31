import React, { useEffect, useState } from "react";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ChooseItemsContainer from "../../components/ChooseItemsContainer";
import TagsContainer from "../../components/TagsContainer";

/**
 * displays the chosen items in all categories
 * @props   items: dictionary of all items that belong in the outfit {tops: [], bottoms: [], ...}
 *          onClickCategory: function that handles when user clicks "Choose" button for any category
 *          onDelete: function that handles deleting an item from the outfit
 */
function CreateOutfitOverview(props) {
  const navigate = useNavigate();
  const [shouldShowConfirm, setShouldShowConfirm] = useState(false);

  const handleDeleteItem = (item, type) => {
    const oldItems = props.items[type];
    const newItems = oldItems.filter((a) => a.id !== item.id);
    props.onDelete(newItems, type);
  };

  const handleAddTag = (tag) => {
    props.tags.push(tag);
    props.onEditTags([...props.tags]);
  };

  const handleDeleteTag = (tag) => {
    const newTags = props.tags.filter((item) => item != tag);
    props.onEditTags(newTags);
  };

  // only display confirm button if there is at least one item added to the outfit
  useEffect(() => {
    setShouldShowConfirm(
      Object.keys(props.items).some((key) => props.items[key].length !== 0)
    );
  }, [props.items]);

  return (
    <>
      <Grid container>
        <Grid item>
          <Link to="/outfit">
            <Button startIcon={<ArrowBackIosNew />}>Back</Button>
          </Link>
        </Grid>
      </Grid>

      {/* title of page */}
      <Grid container>
        <Grid item>
          <h1>Create Outfit</h1>
        </Grid>
      </Grid>

      {/* tags section */}
      <Grid container>
        <Grid item>
          <TagsContainer
            edit={true}
            tags={props.tags}
            handleAddTag={handleAddTag}
            handleDeleteTag={handleDeleteTag}
          />
        </Grid>
      </Grid>

      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <ChooseItemsContainer
            type={"tops"}
            selected={props.items.tops}
            onClickCategory={() => props.onClickCategory("tops")}
            onDeleteItem={handleDeleteItem}
          />
        </Grid>

        <Grid item xs={12}>
          <ChooseItemsContainer
            type={"bottoms"}
            selected={props.items.bottoms}
            onClickCategory={() => props.onClickCategory("bottoms")}
            onDeleteItem={handleDeleteItem}
          />
        </Grid>

        <Grid item xs={12}>
          <ChooseItemsContainer
            type={"footwear"}
            selected={props.items.footwear}
            onClickCategory={() => props.onClickCategory("footwear")}
            onDeleteItem={handleDeleteItem}
          />
        </Grid>

        <Grid item xs={12}>
          <ChooseItemsContainer
            type={"accessories"}
            selected={props.items.accessories}
            onClickCategory={() => props.onClickCategory("accessories")}
            onDeleteItem={handleDeleteItem}
          />
        </Grid>
      </Grid>

      {shouldShowConfirm ? (
        <Grid container justifyContent={"center"}>
          <Grid item>
            {/* TODO: change */}
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/outfit");
              }}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}
export default CreateOutfitOverview;
