import React, { Component } from "react";

import {
  Dialog,
  DialogTitle,
  Box,
  IconButton,
  DialogContent,
  ImageList,
  ImageListItem,
  DialogActions,
  Button,
} from "@mui/material";
import TagsContainer from "./TagsContainer";
import CloseIcon from "@mui/icons-material/Close";

function ViewOutfitDialog(props) {
  const outfit = props.items[props.index];

  return (
    <Dialog {...props}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>View Outfit</Box>
          <Box>
            <IconButton onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {/* display image */}
        <h2>{outfit["name"]}</h2>
        <ImageList cols={2} gap={0}>
          {outfit["items"].map((item) => (
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

        {/* display tags */}
        <Box mt={2}>
          <TagsContainer tags={outfit["tags"]} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewOutfitDialog;
