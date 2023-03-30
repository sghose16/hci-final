import React from "react";

import { Container, Grid } from "@mui/material";
import DisplayItemsContainer from "../components/DisplayItemsContainer";

import { tops, bottoms, footwear, accessories } from "../data/data.js";

function Closet() {
  return (
    <Container>
      {/* title of page */}
      <Grid container>
        <Grid item>
          <h1>Closet</h1>
        </Grid>
      </Grid>

      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <DisplayItemsContainer title={"Tops"} items={tops} />
        </Grid>

        <Grid item xs={12}>
          <DisplayItemsContainer title={"Bottoms"} items={bottoms} />
        </Grid>

        <Grid item xs={12}>
          <DisplayItemsContainer title={"Footwear"} items={footwear} />
        </Grid>

        <Grid item xs={12}>
          <DisplayItemsContainer title={"Accessories"} items={accessories} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Closet;
