import React, { useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import TagGroup from "./TagGroup";

function TagsContainer(props) {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = (tag) => {
    if (tag !== "") {
      setNewTag("");
      props.handleAddTag(tag);
    }
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
              size="small"
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
        <TagGroup tags={props.tags} onClick={props.handleDeleteTag} />
      </Box>
    </Box>
  );
}

export default TagsContainer;
