import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import { useState } from "react";

import TagGroup from "./TagGroup";

function TagsContainer(props) {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = (tag) => {
    if (tag !== "") {
      setNewTag("");
      // add if not already in tags
      if (!props.tags.includes(tag)) {
        props.handleAddTag(tag);
      }
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Grid container alignItems={"center"}>
          <Grid item xs={3}>
            <h4 className="tags-header">Tags</h4>
          </Grid>
          <Grid item xs={9}>
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
          </Grid>
        </Grid>
      </Box>
      <Box>
        <TagGroup tags={props.tags} onClick={props.handleDeleteTag} />
      </Box>
    </Box>
  );
}

export default TagsContainer;
