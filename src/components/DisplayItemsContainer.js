import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link } from "react-router-dom";
import { getDatabase, get, push, ref, child, remove, set } from "firebase/database";
import { getAuth } from 'firebase/auth';

import TagsContainer from "./TagsContainer";

function DisplayItemsContainer(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const getItems = () => {
    console.log("getItems");
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());
    
    get(child(dbRef, `users/${userId}/items/${props.title}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setItems( Object.values(snapshot.val()) );
      } else {
        setItems([]);
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  const addItem = (item) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    push(child(dbRef, `users/${userId}/items/${props.title}`), item).then(() => {
      console.log("Push succeeded.");
    }).catch((error) => {
      console.log("Push failed: " + error.message);
    });

    setItems([...items, item]);
    setOpen(false);
  };

  const deleteItem = (item) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    // get ref to item with item.id
    get(child(dbRef, `users/${userId}/items/${props.title}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const allItems = snapshot.val();
        // find the index of the item to delete
        const indexToDelete = Object.keys(allItems).find(
          (key) => allItems[key].id === item.id
        );
        if (indexToDelete) {
          // delete the item from the database
          remove(child(dbRef, `users/${userId}/items/${props.title}/${indexToDelete}`))
            .then(() => {
              console.log("Item deleted successfully");
            })
            .catch((error) => {
              console.log("Error deleting item:", error.message);
            });
        }
      }
    });

    // delete the item from the state
    setItems(items.filter((i) => i.id !== item.id));
  };

  const saveItem = (item) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    // get ref to item with item.id
    get(child(dbRef, `users/${userId}/items/${props.title}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const allItems = snapshot.val();
        // find the index of the item to update
        const indexToUpdate = Object.keys(allItems).find(
          (key) => allItems[key].id === item.id
        );
        if (indexToUpdate) {
          // update the item in the database
          set(child(dbRef, `users/${userId}/items/${props.title}/${indexToUpdate}`), item)
            .then(() => {
              console.log("Item updated successfully");
            })
            .catch((error) => {
              console.log("Error updating item:", error.message);
            });
        }
      }
    });

    // update the item in the state
    setItems(
      items.map((i) => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      })
    );
  };


  useEffect(() => {
    getItems();
  }, []);

  return (
    <Box>
      {/* header */}
      <div className="container-header">
        <Grid container spacing={2} columns={16}>
          <Grid item xs={12}>
            <h2>{props.title}</h2>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "end" }}>
            <Button variant="outlined" onClick={() => setOpen(true)}>
              Add
            </Button>
            <AddItemDialog
              title={props.title}
              open={open}
              handleClose={() => setOpen(false)}
              handleAdd={addItem}
            />
          </Grid>
        </Grid>
      </div>

      <Divider variant="middle" />

      {/* display corresponding items */}
      {isExpanded ? (
        <ItemsCarousel items={items} title={props.title} handleDelete={deleteItem} handleSave={saveItem} />
      ) : null}

      {/* handle expanding and minimizing */}
      <div>
        <Grid container columns={1}>
          <Grid item>
            <IconButton
              aria-label={`Expand ${isExpanded ? "less" : "more"} to view ${
                props.title
              }`}
              component="label"
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

function ItemsCarousel(props) {
  // only show first 5 items
  let numItems = props.items.length > 5 ? 5 : props.items.length;

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!props.items || props.items.length === 0) {
    return <div>No {props.title} found.</div>;
  }

  const handleDelete = (item) => {
    props.handleDelete(item);
    setOpen(false);
  };

  const handleSave = (item) => {
    props.handleSave(item);
    setOpen(false);
  };

  return (
    <Box className="carousel-container">
      <ItemDialog
        open={open}
        item={props.items[index]}
        handleSave={handleSave}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
      />
      {props.items.slice(0, numItems).map((item, index) => {
        return (
          <div
            className="img-container item-carousel"
            key={item["id"]}
            onClick={() => {
              setIndex(index);
              setOpen(true);
            }}
          >
            <img src={item["img"]} className="img-square" />
          </div>
        );
      })}
      <div
        style={{
          display: "inline-block",
        }}
      >
        <Link
          to={`/all-${props.title.toLowerCase()}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            aria-label={`See more ${props.title}`}
            onClick={null}
          >
            See more
          </Button>
        </Link>
      </div>
    </Box>
  );
}

function ItemDialog(props) {
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
  const [img, setImg] = useState(props.item.img);
  const [tags, setTags] = useState(props.item.tags || []);

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleImgChange = (event) => {
    setImg(event.target.value);
  };

  const handleTagsChange = (tags) => {
    setTags([...tags]);
  };

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleDelete = () => {
    props.handleDelete(props.item);
  };

  const handleSave = () => {
    // Update item with new data
    props.handleSave({
      id: props.item.id,
      brand: brand,
      size: size,
      img: img,
      tags: tags,
    });
    props.handleClose();
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
        <Box>
          <div className="img-container">
            <img src={props.item["img"]} className="img-square" />
          </div>
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
            tags={ props.item["tags"] || [] } 
            handleAddTag={() => {}}
            handleDeleteTag={() => {}}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function AddItemDialog(props) {
  const [tags, setTags] = useState([]);
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");

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
    props.handleClose();
  };

  const handleAdd = () => {
    const item = {
      brand: brand,
      size: size,
      tags: tags,
      img: require("../assets/top1.png"),
      id: Math.random().toString(36).substr(2, 9),
    };

    props.handleAdd(item);
    setTags([]);
    setBrand("");
    setSize("");
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Add {props.title}</Box>
          <Box>
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
              <AddIcon />
            </Box>
          </IconButton>
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

export default DisplayItemsContainer;
