import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import ChooseItemsContainer from "../components/ChooseItemsContainer";

function CreateOutfit() {
    const [top, setTop] = useState([]);
    const [bottom, setBottom] = useState([]);
    const [foot, setFoot] = useState([]);
    const [accessory, setAccessory] = useState([]);

  return (
    <Container>
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
            selected={top}
          />
        </Grid>

        <Grid item xs={12}>
          <ChooseItemsContainer
            title={"Bottoms"}
            selected={bottom}
          />
        </Grid>

        <Grid item xs={12}>
          <ChooseItemsContainer
            title={"Footwear"}
            selected={foot}
          />
        </Grid>

        <Grid item xs={12}>
          <ChooseItemsContainer
            title={"Accessories"}
            selected={accessory}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateOutfit;
