import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, Container, Grid } from "@mui/material";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// assets
import top1 from "../assets/top1.png";
import top2 from "../assets/top2.png";
import top3 from "../assets/top3.png";
import top4 from "../assets/top4.png";
import top5 from "../assets/top5.png";
import top6 from "../assets/top6.jpeg";
import top7 from "../assets/top7.png";
import top8 from "../assets/top8.png";
import top9 from "../assets/top9.png";
import top10 from "../assets/top10.png";
import top11 from "../assets/top11.png";

import bot1 from "../assets/bot1.png";
import bot2 from "../assets/bot2.png";
import bot3 from "../assets/bot3.png";
import bot4 from "../assets/bot4.png";
import bot5 from "../assets/bot5.png";
import bot6 from "../assets/bot6.png";
import bot7 from "../assets/bot7.png";

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
import acc6 from "../assets/acc6.png";
import acc7 from "../assets/acc7.png";
import acc8 from "../assets/acc8.jpeg";

const tops = [
  top1,
  top2,
  top3,
  top4,
  top5,
  top6,
  top7,
  top8,
  top9,
  top10,
  top11,
];
const bots = [bot1, bot2, bot3, bot4, bot5, bot6, bot7];
const foots = [foot1, foot2, foot3, foot4, foot5];
const accs = [acc1, acc2, acc3, acc4, acc5, acc6, acc7, acc8];

function ShowAllSelectable(props) {
    const [select, setSelected] = useState(-1);

    console.log(select)
    const items = () => {
        let items;
      
        switch (props.type) {
          case "tops":
            items = tops;
            break;
          case "bottoms":
            items = bots;
            break;
          case "footwear":
            items = foots;
            break;
          case "accessories":
            items = accs;
            break;
          default:
            items = [];
        }
      
        return items.map((item, index) => {
          return (
             <ToggleButton className="img-container" value={index} onClick={() => setSelected(index)} sx={{height: "100%", width: "100%"}}>
                <img src={item} className="img-square" />
              </ToggleButton>
          );
        });
      }

  return (
    <Container>
      {/* back button */}
      <Grid container>
        <Grid item>
          <Link to="/create-outfit">
            <Button startIcon={<ArrowBackIosNew />}>Back</Button>
          </Link>
        </Grid>
      </Grid>

      {/* title of page */}
      <Grid container>
        <Grid item>
          <h1>{getTitle(props.type)}</h1>
        </Grid>
      </Grid>

      {/* all items under category */}
      <ToggleButtonGroup value={select} exclusive sx={{
        display: "grid",
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(3, 1fr)',
        rowGap: 3,
        columnGap: 3,
      }}>
        {items()}
      </ToggleButtonGroup>
    </Container>
  );
}

function getTitle(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default ShowAllSelectable;