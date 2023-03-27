import React from "react";

import { Container, Grid } from "@mui/material";
import DisplayItemsContainer from "../components/DisplayItemsContainer";

// assets
import top1 from "../assets/top1.png";
import top2 from "../assets/top2.png";
import top3 from "../assets/top3.png";
import top4 from "../assets/top4.png";
import top5 from "../assets/top5.png";

import bot1 from "../assets/bot1.png";
import bot2 from "../assets/bot2.png";
import bot3 from "../assets/bot3.png";
import bot4 from "../assets/bot4.png";
import bot5 from "../assets/bot5.png";

import foot1 from "../assets/foot1.jpeg";
import foot2 from "../assets/foot2.png";
import foot3 from "../assets/foot3.png";
import foot4 from "../assets/foot4.jpg";
import foot5 from "../assets/foot5.jpeg";

import acc1 from "../assets/acc1.png";
import acc2 from "../assets/acc2.png";
import acc3 from "../assets/acc3.png";
import acc4 from "../assets/acc4.png";
import acc5 from "../assets/acc5.png";

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
          <DisplayItemsContainer
            title={"Tops"}
            items={[top1, top2, top3, top4, top5]}
          />
        </Grid>

        <Grid item xs={12}>
          <DisplayItemsContainer
            title={"Bottoms"}
            items={[bot1, bot2, bot3, bot4, bot5]}
          />
        </Grid>

        <Grid item xs={12}>
          <DisplayItemsContainer
            title={"Footwear"}
            items={[foot1, foot2, foot3, foot4, foot5]}
          />
        </Grid>

        <Grid item xs={12}>
          <DisplayItemsContainer
            title={"Accessories"}
            items={[acc1, acc2, acc3, acc4, acc5]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Closet;
