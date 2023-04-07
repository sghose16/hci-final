import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  TextField,

} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import TagsContainer from "./TagsContainer";
import { ref as refStorage } from "firebase/storage";
import app, { storage } from "../firebase";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";

/**
 * Dialog for an item's information. Allows them to view and edit.
 * @props       open: boolean that determines whether dialog is displayed
 *              item: item object being displayed
 *              handleSave: function that handles saving changes on item info
 *              handleClose: function that handles closing the dialog
 *              handleDelete: function that handles deleting an item
 */
function ViewItemDialogContainer(props) {
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = (updatedItem) => {
    props.handleSave(updatedItem);
    setEdit(false);
  };

  const handleClose = () => {
    setEdit(false);
    props.handleClose();
  };

  const handleDelete = () => {
    setEdit(false);
    props.handleDelete(props.item);
  };

  if (props.item == null) {
    return null;
  }

  if (edit) {
    return (
      <EditItemDialog
        item={props.item}
        open={props.open}
        handleClose={handleClose}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    );
  } else {
    return (
      <ViewItemDialog
        item={props.item}
        open={props.open}
        handleEdit={handleEdit}
        handleClose={handleClose}
      />
    );
  }
}

function EditItemDialog(props) {
  const [brand, setBrand] = useState(props.item.brand);
  const [size, setSize] = useState(props.item.size);
  const [tags, setTags] = useState(props.item.tags || []);
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState(props.item.img);

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

  const handleSave = () => {
    // Update item with new data
    props.handleSave({
      id: props.item.id,
      brand: brand,
      size: size,
      img: imageUrl,
      tags: tags,
    });
    props.handleClose();
  };


  // Handle file upload event and update state
  async function handleImageChange(event) {
    console.log("updating image");
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
    const newImage = await handleUpload();
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
    const downloadURL = await uploadPicture(file);
    return downloadURL;
  };


  return (
    <Dialog {...props}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Edit Item</Box>
          <Box>
            <IconButton onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {/* Edit image */}
        {/* <Box>
          <div className="img-container">
            <img src={props.item["img"]} className="img-square" />
          </div>
        </Box> */}



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
                  <img
                  src={props.item["img"]}
                  alt="selected"
                  height="100%"
                  width="100%"
                />
                )}
              </label>
            </Box>
          </IconButton>
          <Input
            id="upload-file"
            type="file"
            onChange={handleImageChange}
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






        {/* Edit brand and size */}
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Brand"
                variant="outlined"
                value={brand}
                onChange={handleBrandChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Size"
                variant="outlined"
                value={size}
                onChange={handleSizeChange}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Edit tags */}
        <Box mt={2}>
          <TagsContainer
            edit={true}
            tags={tags}
            handleAddTag={handleAddTag}
            handleDeleteTag={handleDeleteTag}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button
            sx={{ width: "30%" }}
            variant="outlined"
            color="error"
            onClick={props.handleDelete}
          >
            Delete
          </Button>
          <Button
            sx={{ width: "30%" }}
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

function ViewItemDialog(props) {
  return (
    <Dialog {...props}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>View Item</Box>
          <Box>
            <IconButton onClick={props.handleEdit}>
              <EditIcon fontSize="large"/>
            </IconButton>
            <IconButton onClick={props.handleClose}>
              <CloseIcon fontSize="large"/>
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {/* display image */}
        <Box>
          <div className="img-container">
            <img src={props.item["img"]} className="img-square" />
          </div>
        </Box>
        {/* view brand and size */}
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Brand"
                variant="outlined"
                value={props.item["brand"]}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Size"
                variant="outlined"
                value={props.item["size"]}
                disabled
              />
            </Grid>
          </Grid>
        </Box>

        {/* display tags */}
        <Box mt={2}>
          <TagsContainer
            edit={false}
            tags={props.item["tags"] || []}
            handleAddTag={() => {}}
            handleDeleteTag={() => {}}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ViewItemDialogContainer;
