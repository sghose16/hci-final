import React, { useState } from "react";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Container, Grid } from "@mui/material";
import ChooseItemsContainer from "../components/ChooseItemsContainer";
import { Link } from "react-router-dom";

function CreateOutfit() {
  const [top, setTop] = useState([]);
  const [bottom, setBottom] = useState([]);
  const [foot, setFoot] = useState([]);
  const [accessory, setAccessory] = useState([]);

  return (
    <Container>
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
          <ChooseItemsContainer title={"Tops"} selected={top} />
        </Grid>

        <Grid item xs={12}>
          <ChooseItemsContainer title={"Bottoms"} selected={bottom} />
        </Grid>

        <Grid item xs={12}>
          <ChooseItemsContainer title={"Footwear"} selected={foot} />
        </Grid>

        <Grid item xs={12}>
          <ChooseItemsContainer title={"Accessories"} selected={accessory} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateOutfit;
