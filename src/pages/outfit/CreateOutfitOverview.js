import { ArrowBackIosNew } from "@mui/icons-material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChooseItemsContainer from "../../components/ChooseItemsContainer";
import TagsContainer from "../../components/TagsContainer";

/**
 * displays the chosen items in all categories
 * @props   items: dictionary of all items that belong in the outfit {tops: [], bottoms: [], ...}
 *          tags: array of all tags for an outfit ["casual", ...]
 *          name: string of the name of an outfit
 *          onClickCategory: function that handles when user clicks "Choose" button for any category
 *          onDelete: function that handles deleting an item from the outfit
 *          onEditTags: function that handles adding and deleting tags
 *          onEditName: function that handles editing the name of an outfit
 *          isCreating: used to determine title "Create" or "Edit" Outfit
 */
function CreateOutfitOverview(props) {
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
    const newTags = props.tags.filter((item) => item !== tag);
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
      <Grid container mt={2}>
        <Grid item>
          <Link to="/outfit" style={{ textDecoration: "none" }}>
            <Button startIcon={<ArrowBackIosNew />}>Back</Button>
          </Link>
        </Grid>
      </Grid>

      {/* title of page */}
      <Grid container>
        <Grid item>
          <h1>{`${props.isCreating ? "Create" : "Edit"}`} Outfit</h1>
        </Grid>
      </Grid>

      {/* name of outfit section */}
      <Grid container alignItems={"center"}>
        <Grid item xs={10}>
          <TextField
            id="outlined-basic"
            label="Outfit Name"
            value={props.name}
            onChange={(event) => {
              props.onEditName(event.target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Grid container justifyContent={"flex-end"}>
            <IconButton onClick={props.onEditFavorite}>
              {props.favorite ? (
                <FavoriteOutlinedIcon fontSize="large" color="error" />
              ) : (
                <FavoriteBorderOutlinedIcon fontSize="large" />
              )}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      {/* tags section */}
      <Grid container mt={2}>
        <Grid item xs={12}>
          <TagsContainer
            edit={true}
            tags={props.tags || []}
            handleAddTag={handleAddTag}
            handleDeleteTag={handleDeleteTag}
          />
        </Grid>
      </Grid>

      <Grid container rowSpacing={2}>
        {Object.keys(props.items).map((category) => (
          <Grid item xs={12} key={category}>
            <ChooseItemsContainer
              type={category}
              selected={props.items[category]}
              onClickCategory={() => props.onClickCategory(category)}
              onDeleteItem={handleDeleteItem}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent={"center"} mt={2}>
        {props.isCreating ? null : (
          <Grid item>
            <Button
              sx={{ width: "90%" }}
              variant="outlined"
              color="error"
              onClick={() => props.onDeleteOutfit()}
            >
              Delete
            </Button>
          </Grid>
        )}
        {shouldShowConfirm ? (
          <Grid item>
            <Button variant="outlined" onClick={() => props.onSubmit()}>
              Confirm
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
}
export default CreateOutfitOverview;
