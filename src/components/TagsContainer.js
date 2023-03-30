import React, { useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import TagGroup from "./TagGroup";

function TagsContainer(props) {
  const [tags, setTags] = useState([...props.tags]);
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

        {props.edit && (
          <div>
            <TextField
              size = "small"
              placeholder="Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <IconButton onClick={() => handleAddTag(newTag)}>
              <AddIcon />
            </IconButton>
          </div>
        )}
      </Box>

      <Box>
        <TagGroup tags={tags} onClick={() => {}} />
      </Box>
    </Box>
  );
}

export default TagsContainer;
