import React from "react";

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
import { useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import "../css/Dialog.css";

function ViewOutfitDialog(props) {
  const outfit = props.items[props.index];

  const handleFavoriteChange = () => {
    props.handleSave({
      items: outfit["items"],
      tags: outfit["tags"] ?? [],
      name: outfit["name"],
      favorite: !outfit["favorite"],
      id: outfit["id"],
    });
  };

  const navigate = useNavigate();
  const flatItems = () => {
    let result = [];
    const itemArray = Object.values(outfit["items"]);

    itemArray.forEach((arr) => {
      result.push(...arr);
    });

    return result.slice(0, 4);
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <h3 className="popup-title">View Outfit</h3>
          </Box>
          <Box>
            <IconButton
              onClick={() => {
                navigate(`/edit-outfit/${outfit["id"]}`);
              }}
            >
              <EditIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={props.handleClose}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container alignItems={"center"}>
          <Grid item xs={10}>
            {/* display image */}
            <h2 className="outfit-name">{outfit["name"]}</h2>
          </Grid>

          <Grid item xs={2}>
            <Grid container justifyContent={"flex-end"}>
              {/* display favorite */}
              <IconButton onClick={handleFavoriteChange}>
                {props.items[props.index]["favorite"] ? (
                  <FavoriteOutlinedIcon fontSize="large" color="error" />
                ) : (
                  <FavoriteBorderOutlinedIcon fontSize="large" />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

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
              <TagsContainer
                tags={outfit["tags"] || []}
                handleDeleteTag={() => {}}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ViewOutfitDialog;
