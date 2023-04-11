import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  Box,
  DialogContent,
    Button, 
    TextField,
    IconButton,
    Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import AddIcon from "@mui/icons-material/Add";



function FilterDialog(props) {
    const [brands, setBrands] = useState([]);
    const [brand, setNewBrand] = useState("");
    
    const [tag, setNewTag] = useState("");
    const [tags, setTags] = useState([]);

    const [favorite, setFavorite] = useState(false);

    const handleFavoriteChange = () => {
        setFavorite(!favorite);
      };
    
      const handleBrandChange = (event) => {
        setNewBrand(event.target.value);
      };

      const handleTagsChange = (event) => {
        setNewTag(event.target.value);
      };

      const handleAddBrand = (b) => {
        if (b !== "") {
          setBrands([...brands, b]);
        }
        setNewBrand("");     
      };

      const handleAddTag = (t) => {
        if (t !== "") {
          setTags([...tags, t]);
        }
        setNewTag("");     
      };

      const handleDeleteTag = (tag) => {
        setTags(tags.filter((t) => t !== tag));
      };

      const handleDeleteBrand = (brand) => {
        setBrands(brands.filter((t) => t !== brand));
      };
    
  
      const handleFiltering = () => {
        if (brands.length !== 0){
            props.handleBrand(brands);
            props.handleClose();
        }
        if (tags.length !== 0){
            props.handleTags(tags);
            props.handleClose();
        } 
        if (favorite === true){
          props.handleFavorite(favorite);
          props.handleClose();
        }
        setNewBrand("");     
        setNewTag("");
        setFavorite(false);
        setBrands([]);
        setTags([]);
      }

  return (
    <Dialog {...props}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Filter</Box>
          <IconButton onClick={props.handleClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>

      <Grid container spacing={2}>
          <Grid item xs={12}>
          <Box display="flex" alignItems="flex-start">
                Show Favorites
              
                <IconButton onClick={handleFavoriteChange}>
                    {favorite ? (
                          <FavoriteOutlinedIcon/>
                        ) : (
                          <FavoriteBorderOutlinedIcon />
                        )}
                </IconButton>
              </Box> 
          </Grid>       
      </Grid>
        



      <form>

            <Grid container alignItems="center">
              <Grid item xs>
                <TextField
                size="small"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setNewBrand(e.target.value)}
                fullWidth
                />
              </Grid>
              <Grid item>
                <IconButton onClick={() => handleAddBrand(brand)}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>

              <Grid container alignItems="center">
                <Grid item xs>
                  <Box display="flex" flexDirection="row" mb={2}>
                    <BrandGroup brands={brands} onClick={handleDeleteBrand}/>
                  </Box>
                </Grid>
              </Grid>

              <Grid container alignItems="center">
                <Grid item xs>
                  <TextField
                  size="small"
                  placeholder="Tag"
                  value={tag}
                  onChange={(e) => setNewTag(e.target.value)}
                  fullWidth
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={() => handleAddTag(tag)}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container alignItems="center">
                <Grid item xs>
                  <Box display="flex" flexDirection="row" mb={2}>
                    <TagGroup tags={tags}  onClick={handleDeleteTag} />
                  </Box>
                </Grid>
              </Grid>
           
            <Button variant="contained"  onClick={handleFiltering}>
                Filter
            </Button>
      
        </form>
      </DialogContent>
    </Dialog>
  );
}

function BrandGroup(props) {
  return props.brands.map((brand, index) => (
    <Button
      variant="contained"
      key={brand}
      onClick={() => props.onClick(brand)}
      sx={{
        marginRight: index !== props.brands.length - 1 ? 1 : 0,
      }}
    >
      {brand}
    </Button>
  ));
}

function TagGroup(props) {
  return props.tags.map((tag, index) => (
    <Button
      variant="contained"
      key={tag}
      onClick={() => props.onClick(tag)}
      sx={{
        marginRight: index !== props.tags.length - 1 ? 1 : 0,
      }}
    >
      {tag}
    </Button>
  ));
}


export default FilterDialog;
