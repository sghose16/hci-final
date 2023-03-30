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
        <ImageList cols={2} gap={0}>
          {props.items[props.index]["items"].map((item) => (
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
          <TagsContainer tags={props.items[props.index]["tags"]} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewOutfitDialog;
