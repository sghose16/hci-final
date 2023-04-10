import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
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
        <h4 className="tags-header">Tags</h4>

        {props.edit && (
          <Grid container alignItems="center">
            <Grid item xs>
              <TextField
                size="small"
                placeholder="Tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item>
              <IconButton onClick={() => handleAddTag(newTag)}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Box>

      <Box>
        <TagGroup tags={props.tags} onClick={props.handleDeleteTag} />
      </Box>
    </Box>
  );
}

export default TagsContainer;
