import React from "react";
import { Chip } from "@mui/material";

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
        marginRight: index !== props.tags.length - 1 ? 1 : 0,
        marginBottom: 1,
        fontSize: "14px",
      }}
    />
  ));
}

export default TagGroup;
