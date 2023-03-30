import React from "react";
import { Button } from "@mui/material";

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
      {console.log("this is tag" + tag)}
    </Button>
  ));
}

export default TagGroup;
