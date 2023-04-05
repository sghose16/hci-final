import React from "react";

import { Container, Grid } from "@mui/material";
import DisplayItemsContainer from "../../components/DisplayItemsContainer";

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
          <DisplayItemsContainer title={"Tops"} />
        </Grid>

        <Grid item xs={12}>
          <DisplayItemsContainer title={"Bottoms"} />
        </Grid>

        <Grid item xs={12}>
          <DisplayItemsContainer title={"Footwear"} />
        </Grid>

        <Grid item xs={12}>
          <DisplayItemsContainer title={"Accessories"} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Closet;
