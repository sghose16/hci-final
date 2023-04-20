import { Box, Divider, Grid, ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";

import "../css/ItemsContainer.css";
import ViewOutfitDialog from "./ViewOutfitDialog";

function DisplayOutfitsContainer(props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleSave = (item) => {
    setIsDialogOpen(false);
    props.handleSave(item);
  };

  const renderOutfits = props.outfits.map((fit, index) => {
    // get all items in an outfit into just one array
    const flatItems = () => {
      let result = [];
      const itemArray = Object.values(fit["items"]);

      itemArray.forEach((arr) => {
        result.push(...arr);
      });

      return result.slice(0, 4);
    };

    return (
      <Grid item xs={6} key={`favorite outfits ${index}`}>
        <div
          onClick={() => {
            setIndex(index);
            setIsDialogOpen(true);
          }}
        >
          <ImageList
            sx={{
              border: 1,
              borderColor: "grey.500",
              backgroundColor: "white",
            }}
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
          <h3 className="outfit-name-grid">{fit["name"]}</h3>
        </div>
      </Grid>
    );
  });

  return (
    <Box className="items-container">
      {/* header */}
      <div className="container-header">
        <Grid container>
          <Grid item>
            <h2>Favorites</h2>
          </Grid>
        </Grid>
      </div>

      <Divider variant="middle" />

      {/* display outfits */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {props.outfits.length === 0 ? (
          <p style={{ paddingLeft: "8px" }}>No favorite outfits found.</p>
        ) : (
          <>
            <ViewOutfitDialog
              open={isDialogOpen}
              index={index}
              items={props.outfits}
              handleClose={() => setIsDialogOpen(false)}
              handleSave={handleSave}
            />
            {renderOutfits}
          </>
        )}
      </Grid>
    </Box>
  );
}

export default DisplayOutfitsContainer;
