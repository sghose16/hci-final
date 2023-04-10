import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  Box,
  DialogContent,
    Button, 
    TextField,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


function FilterDialog(props) {
    const [brand, setBrand] = useState("");
    const [tags, setTags] = useState("");

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
      };
    
      const handleTagsChange = (event) => {
        setTags(event.target.value);
      };

      const handleFiltering = () => {
            if (brand !== ""){
                props.handleBrand(brand);
                props.handleClose();
            }
            if (tags !== ""){
                props.handleTags(tags);
                props.handleClose();
            } 
            setBrand("");     
            setTags("");
      }

  return (
             
    <Dialog {...props}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Filter</Box>
            <IconButton onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
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
          </Box>

          <Box display="flex" flexDirection="row" mb={2}>
          <Box mr={2}>
              <TextField
                fullWidth
                placeholder="Tags"
                value={tags}
                onChange={handleTagsChange}
              />
            </Box>
           
            <Button variant="contained"  onClick={handleFiltering}>
                Filter
            </Button>
          
          </Box>
        </form>
        </DialogContent>
    </Dialog>
  );
}

export default FilterDialog;
