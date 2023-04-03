import React from "react";
import { useState } from "react";

import { Container, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { outfits } from "../../data/data";
import ViewOutfitDialog from "../../components/ViewOutfitDialog";

function Outfit() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const renderOutfits = outfits.map((fit, index) => {
    const flatItems = () => {
      let result = [];
      const itemArray = Object.values(fit["items"]);

      itemArray.forEach((arr) => {
        result.push(...arr);
      });

      return result.slice(0, 4);
    };

    return (
      <Grid item xs={6} key={index}>
        <div
          onClick={() => {
            setIndex(index);
            setOpen(true);
          }}
        >
          <ImageList
            sx={{ border: 1, borderColor: "grey.500" }}
            cols={2}
            gap={0}
          >
            {flatItems().map((item) => (
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
        </div>
      </Grid>
    );
  });

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
            <Link to="/create-outfit" style={{ textDecoration: "none"}} >
              <Button
                variant="outlined"
              >
                Add
              </Button>
            </Link>
        </Grid>
      </Grid>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <ViewOutfitDialog
          open={open}
          index={index}
          items={outfits}
          handleClose={() => setOpen(false)}
          handleDelete={() => setOpen(false)}
        />
        {renderOutfits}
      </Grid>
    </Container>
  );
}

export default Outfit;
