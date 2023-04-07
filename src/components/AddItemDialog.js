import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  IconButton,
  TextField,
  Input,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import TagsContainer from "./TagsContainer";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import { ref as refStorage } from "firebase/storage";
import app, { storage } from "../firebase";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";

/**
 * Dialog for adding a new item to the closet.
 * @props       type: string of category of clothing (tops, bottoms, etc.)
 *              open: boolean to determine whether dialog is displayed
 *              handleClose: function to handle closing the dialog
 *              handleAdd: function to handle adding an item and its info
 *
 */
function AddItemDialog(props) {
  const [tags, setTags] = useState([]);
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    setFavorite(!favorite);
  }
  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleClose = () => {
    setTags([]);
    setBrand("");
    setSize("");
    setFile("");
    setImageUrl("");
    props.handleClose();
  };

  const handleAdd = async () => {
    const image = await handleUpload();
    const item = {
      brand: brand,
      size: size,
      tags: tags,
      img: image,
      favorite: favorite,
      id: Math.random().toString(36).substr(2, 9),
    };

    props.handleAdd(item);
    setTags([]);
    setBrand("");
    setSize("");
    setFile("");
    setImageUrl("");
    setFavorite(false);
  };

  // Handle file upload event and update state
  function handleChange(event) {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

  async function uploadPicture(file) {
    const storageRef = refStorage(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Do nothing. This callback is used to listen to the progress of the upload.
        },
        (error) => {
          reject(error);
        },
        () => {
          resolve();
        }
      );
    });
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  }

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload an image first!");
    }
    const downloadURL = await uploadPicture(file);
    return downloadURL;
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Add {props.type}</Box>
          <Box>
            <IconButton onClick={handleFavorite}>
                {favorite ? (
                      <FavoriteOutlinedIcon/>
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
            </IconButton>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {/* add image */}
        <Box sx={{ textAlign: "center" }}>
          <IconButton>
            <Box
              mb={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="150px"
              width="150px"
              border="2px dashed black"
            >
              <label htmlFor="upload-file">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="selected"
                    height="100%"
                    width="100%"
                  />
                ) : (
                  <AddIcon />
                )}
              </label>
            </Box>
          </IconButton>
          <Input
            id="upload-file"
            type="file"
            onChange={handleChange}
            style={{ display: "none" }}
            endAdornment={
              <InputAdornment position="end">
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </InputAdornment>
            }
          />
        </Box>

        {/* add brand and size */}
        <form>
          <Box display="flex" flexDirection="row" mb={2}>
            <Box mr={2}>
              <TextField
                fullWidth
                placeholder="Brand"
                value={brand}
                onChange={handleBrandChange}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                placeholder="Size"
                value={size}
                onChange={handleSizeChange}
              />
            </Box>
          </Box>
        </form>

        {/* add tags */}
        <Box>
          <TagsContainer
            edit={true}
            tags={tags}
            handleAddTag={handleAddTag}
            handleDeleteTag={handleDeleteTag}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddItemDialog;
