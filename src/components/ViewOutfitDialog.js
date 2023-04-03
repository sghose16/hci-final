import React, { Component } from "react";

import {
  Dialog,
  DialogTitle,
  Box,
  IconButton,
  DialogContent,
  ImageList,
  ImageListItem,
  Grid,
} from "@mui/material";
import TagsContainer from "./TagsContainer";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

function ViewOutfitDialog(props) {
  const outfit = props.items[props.index];
  const flatItems = () => {
    let result = [];
    const itemArray = Object.values(outfit["items"]);

    itemArray.forEach((arr) => {
      result.push(...arr);
    });

    return result.slice(0, 4);
  };

  return (
    <Dialog {...props}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>View Outfit</Box>
          <Box>
            <IconButton onClick={props.handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* display image */}
        <h2>{outfit["name"]}</h2>

        <Box>
          <ImageList cols={2} gap={0}>
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
        </Box>

        {/* display tags */}
        <Box mt={2}>
          <Grid container>
            <Grid item>
              <TagsContainer tags={outfit["tags"]} />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ViewOutfitDialog;
