import React, { useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function TagsContainer() {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = (tag) => {
    if (tag !== "") {
      setTags([...tags, tag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="body1" style={{ marginRight: "8px" }}>
          Tags:
        </Typography>
        <TextField
          placeholder="Tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <IconButton onClick={() => handleAddTag(newTag)}>
          <AddIcon />
        </IconButton>
      </Box>
      {tags.map((tag) => (
        <Button
          variant="contained"
          key={tag}
          onClick={() => handleRemoveTag(tag)}
        >
          {tag}
        </Button>
      ))}
    </Box>
  );
}

export default TagsContainer;