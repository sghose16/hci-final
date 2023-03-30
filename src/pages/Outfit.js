import React from 'react';

import { Container, Grid } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import top1 from "../assets/top1.png";
import top2 from "../assets/top2.png";
import top3 from "../assets/top3.png";
import top4 from "../assets/top4.png";
import top5 from "../assets/top5.png";
import top6 from "../assets/top6.jpeg";
import top9 from "../assets/top9.png";

import bot1 from "../assets/bot1.png";
import bot2 from "../assets/bot2.png";
import bot3 from "../assets/bot3.png";
import bot6 from "../assets/bot6.png";
import bot7 from "../assets/bot7.png";
import bot8 from "../assets/bot8.png";

import foot1 from "../assets/foot1.jpeg";
import foot2 from "../assets/foot2.png";
import foot4 from "../assets/foot4.jpg";
import foot5 from "../assets/foot5.jpeg";

import acc1 from "../assets/acc1.png";
import acc2 from "../assets/acc2.png";
import acc3 from "../assets/acc3.png";
import acc5 from "../assets/acc5.png";
import acc6 from "../assets/acc6.png";
import acc7 from "../assets/acc7.png";
import acc8 from "../assets/acc8.jpeg";

function Outfit() {
  return (
    <Container>
      {/* title of page */}
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <Grid item>
          <h1>Outfits</h1>
        </Grid>
        <Grid item>
          <ThemeProvider theme={theme}>
            <Button variant="outlined" size="small" color='primary' sx={{ borderRadius: 28, }}>Add</Button>
          </ThemeProvider>
        </Grid>
      </Grid>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <ImageList sx={{ border: 1, borderColor: 'grey.500' }} cols={2} gap={0}>
            {outfit1.map((item) => (
              <ImageListItem key={item.img}>
                <div className="img-container">
                  <img src={item.img} className="img-square" alt={item.title} />
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={6}>
          <ImageList sx={{ border: 1, borderColor: 'grey.500' }} cols={2} gap={0}>
            {outfit2.map((item) => (
              <ImageListItem key={item.img}>

                <div className="img-container">
                  <img src={item.img} className="img-square" alt={item.title} />
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={6}>
          <ImageList sx={{ border: 1, borderColor: 'grey.500' }} cols={2} gap={0}>
            {outfit3.map((item) => (
              <ImageListItem key={item.img}>
                <div className="img-container">
                  <img src={item.img} className="img-square" alt={item.title} />
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={6}>
          <ImageList sx={{ border: 1, borderColor: 'grey.500' }} cols={2} gap={0}>
            {outfit4.map((item) => (
              <ImageListItem key={item.img}>

                <div className="img-container">
                  <img src={item.img} className="img-square" alt={item.title} />
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={6}>
          <ImageList sx={{ border: 1, borderColor: 'grey.500' }} cols={2} gap={0}>
            {outfit5.map((item) => (
              <ImageListItem key={item.img}>

                <div className="img-container">
                  <img src={item.img} className="img-square" alt={item.title} />
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={6}>
          <ImageList sx={{ border: 1, borderColor: 'grey.500' }} cols={2} gap={0}>
            {outfit6.map((item) => (
              <ImageListItem key={item.img}>
                <div className="img-container">
                  <img src={item.img} className="img-square" alt={item.title} />
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </Container>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
      contrastText: '#fff',
    }
  },
});

const outfit1 = [
  {
    img: acc1,
    title: 'White Bow',
  },
  {
    img: top1,
    title: 'Black Top',
  },
  {
    img: foot1,
    title: 'Black Heels',
  },
  {
    img: bot1,
    title: 'White Pants',
  }
];

const outfit2 = [
  {
    img: acc3,
    title: 'Earrings',
  },
  {
    img: top2,
    title: 'Corderoy Shirt',
  },
  {
    img: foot2,
    title: 'White Sneakers',
  },
  {
    img: bot2,
    title: 'Brown Pants',
  }
];

const outfit3 = [
  {
    img: acc6,
    title: 'Gold Earrings',
  },
  {
    img: top3,
    title: 'Black Crop Top',
  },
  {
    img: foot5,
    title: 'Black Sandals',
  },
  {
    img: bot7,
    title: 'Green Skirt',
  }
];

const outfit4 = [
  {
    img: acc2,
    title: 'Cat Earrings',
  },
  {
    img: top4,
    title: 'Cat Sweater',
  },
  {
    img: foot4,
    title: 'Docs',
  },
  {
    img: bot3,
    title: 'Black Ripped Pants',
  }
];

const outfit5 = [
  {
    img: acc5,
    title: 'Gold Bracelet',
  },
  {
    img: top9,
    title: 'Green Top',
  },
  {
    img: top6,
    title: 'White Puffy Jacket',
  },
  {
    img: bot6,
    title: 'Light Brown Pants',
  }
];

const outfit6 = [
  {
    img: acc7,
    title: 'White Hairclip',
  },
  {
    img: top5,
    title: 'Blue and White Top',
  },
  {
    img: acc8,
    title: 'Gold Ring',
  },
  {
    img: bot8,
    title: 'White Pants',
  }
];

export default Outfit;