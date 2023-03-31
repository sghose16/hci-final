import React from "react";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ChooseItemsContainer from "../../components/ChooseItemsContainer";

// displays the chosen items in all categories
function CreateOutfitOverview(props) {
  const handleDeleteItem = (item, type) => {
    const oldItems = props.items[type];
    const newItems = oldItems.filter((a) => a.id !== item.id);
    props.onDelete(newItems, type);
  };

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
    </>
  );
}
export default CreateOutfitOverview;
