import React from "react";

import { Container, Grid } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { outfits } from "../data/data";

function Outfit() {
  return (
    <Container>
      {/* title of page */}
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item>
          <h1>Outfits</h1>
        </Grid>
        <Grid item>
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              sx={{ borderRadius: 28 }}
            >
              Add
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {getOutfits()}
      </Grid>
    </Container>
  );
}

function getOutfits() {
  return outfits.map((fit) => {
    return (
      <Grid item xs={6}>
        <ImageList sx={{ border: 1, borderColor: "grey.500" }} cols={2} gap={0}>
          {fit["items"].map((item) => (
            <ImageListItem key={item["id"]}>
              <div className="img-container">
                <img
                  src={item["img"]}
                  className="img-square"
                  alt={`tags: ${item["tags"]}`}
                />
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    );
  });
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      contrastText: "#fff",
    },
  },
});

export default Outfit;
