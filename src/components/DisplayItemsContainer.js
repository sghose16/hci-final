import React, { useState } from "react";
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
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { Link } from "react-router-dom";

import TagsContainer from "./TagsContainer";

function DisplayItemsContainer(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Box>
      {/* header */}
      <div className="container-header">
        <Grid container spacing={2} columns={16}>
          <Grid item xs={12}>
            <h2>{props.title}</h2>
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined" onClick={() => setOpen(true)}>
              Add
            </Button>
            <AddItemDialog
              title={props.title}
              open={open}
              handleClose={() => setOpen(false)}
              handleAdd={() => setOpen(false)}
            />
          </Grid>
        </Grid>
      </div>

      <Divider variant="middle" />

      {/* display corresponding items */}
      {isExpanded ? (
        <ItemsCarousel items={props.items} title={props.title} />
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

  return (
    <Box className="carousel-container">
      {props.items.slice(0, numItems).map((item) => {
        return (
          <div className="img-container img-carousel" key={item["id"]}>
            <img src={item["img"]} className="img-square" />
          </div>
        );
      })}
      <div
        style={{
          display: "inline-block",
        }}
      >
        <Link to={`/all-${props.title.toLowerCase()}`}>
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

function AddItemDialog(props) {
  return (
    <Dialog {...props}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Add {props.title}</Box>
          <Box>
            <IconButton onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {/* add image */}
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

        {/* add brand and size */}
        <form>
          <Box display="flex" flexDirection="row" mb={2}>
            <Box mr={2}>
              <TextField fullWidth placeholder="Brand" />
            </Box>
            <Box>
              <TextField fullWidth placeholder="Size" />
            </Box>
          </Box>
        </form>

        {/* add tags */}
        <TagsContainer />
        
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DisplayItemsContainer;
