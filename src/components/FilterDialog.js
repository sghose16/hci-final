import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";

function FilterDialog(props) {
  const [brands, setBrands] = useState([]);
  const [brand, setNewBrand] = useState("");

  const [tags, setTags] = useState([]);
  const [tag, setNewTag] = useState("");

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
    if (brands.length !== 0) {
      props.handleBrand(brands);
      props.handleClose();
    }
    if (tags.length !== 0) {
      props.handleTags(tags);
      props.handleClose();
    }
    if (favorite === true) {
      props.handleFavorite(favorite);
      props.handleClose();
    }
    setNewBrand("");
    setNewTag("");
    setFavorite(false);
    setBrands([]);
    setTags([]);
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Filter</Box>
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mb={1}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              Show Favorites
              <IconButton onClick={handleFavoriteChange}>
                {favorite ? (
                  <FavoriteOutlinedIcon color="warning" />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <form>
          {props.isOutfits ? null : (
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
          )}

          <Grid container alignItems="center">
            <Grid item xs>
              <Box display="flex" flexDirection="row" mb={2} mt={1}>
                <BrandGroup brands={brands} onClick={handleDeleteBrand} />
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
              <Box display="flex" flexDirection="row" mb={2} mt={1}>
                <TagGroup tags={tags} onClick={handleDeleteTag} />
              </Box>
            </Grid>
          </Grid>

          <Button variant="contained" onClick={handleFiltering}>
            Filter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function BrandGroup(props) {
  return props.brands.map((brand, index) => (
    <Chip
      key={brand}
      label={brand}
      size="large"
      onClick={() => props.onClick(brand)}
      sx={{
        color: "white",
        backgroundColor: "#7A4273",
        marginRight: 1,
        marginBottom: 1,
        fontSize: "14px",
        fontWeight: 600,
        marginRight: index !== props.brands.length - 1 ? 1 : 0,
      }}
    />
  ));
}

function TagGroup(props) {
  return props.tags.map((tag, index) => (
    <Chip
      key={tag}
      label={tag}
      size="large"
      onClick={() => props.onClick(tag)}
      sx={{
        color: "white",
        backgroundColor: "#155263",
        marginRight: 1,
        marginBottom: 1,
        fontSize: "14px",
        fontWeight: 600,
      }}
    />
  ));
}

export default FilterDialog;
