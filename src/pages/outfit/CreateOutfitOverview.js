import React, { Component } from "react";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ChooseItemsContainer from "../../components/ChooseItemsContainer";

// displays the chosen items in all categories
function CreateOutfitOverview(props) {
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
            title={"Tops"}
            selected={props.items.tops}
            onClickCategory={() => props.onClickCategory("tops")}
          />
        </Grid>

        <Grid item xs={12}>
          <ChooseItemsContainer
            title={"Bottoms"}
            selected={props.items.accessories}
            onClickCategory={() => props.onClickCategory("bottoms")}
          />
        </Grid>

        <Grid item xs={12}>
          <ChooseItemsContainer
            title={"Footwear"}
            selected={props.items.accessories}
            onClickCategory={() => props.onClickCategory("footwear")}
          />
        </Grid>

        <Grid item xs={12}>
          <ChooseItemsContainer
            title={"Accessories"}
            selected={props.items.accessories}
            onClickCategory={() => props.onClickCategory("accessories")}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default CreateOutfitOverview;
