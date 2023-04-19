import React from "react";
import { IconButton, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Buttons that show which filters are being applied.
 * @props       filterLabel: dictionary of filters
 *              handleDeleteFilter: remove filter if Button is clicked
 *
 */
function FilterButtons(props) {
  const buttonsFiltering = Object.entries(props.filterLabel).map(
    ([key, value]) => {
      if (key === "brand" && value.length > 0) {
        return value.map((brand) => (
          <Chip
            key={brand}
            label={`Brand: ${brand} `}
            size="large"
            onClick={() => props.handleDeleteFilter(key, brand)}
            onDelete={() => props.handleDeleteFilter(key, brand)}
            deleteIcon={
              <IconButton size="small" style={{ color: "white" }}>
                <CloseIcon />
              </IconButton>
            }
            sx={{
              color: "white",
              backgroundColor: "#7A4273",
              marginRight: 1,
              marginBottom: 1,
              fontSize: "14px",
              fontWeight: 600,
            }}
          />
        ));
      } else if (key === "tags" && value.length > 0) {
        return value.map((tag) => (
          <Chip
            key={tag}
            label={`Tag: ${tag} `}
            size="large"
            onClick={() => props.handleDeleteFilter(key, tag)}
            onDelete={() => props.handleDeleteFilter(key, tag)}
            deleteIcon={
              <IconButton size="small" style={{ color: "white" }}>
                <CloseIcon />
              </IconButton>
            }
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
      } else if (key === "favorite" && value !== false) {
        return (
          <Chip
            key={key}
            label={"Favorites"}
            size="large"
            onClick={() => props.handleDeleteFilter(key, value)}
            onDelete={() => props.handleDeleteFilter(key, value)}
            deleteIcon={
              <IconButton size="small" style={{ color: "black" }}>
                <CloseIcon />
              </IconButton>
            }
            variant="outlined"
            sx={{
              color: "black",
              backgroundColor: "#FFCAB5",
              borderColor: "black",
              marginRight: 1,
              marginBottom: 1,
              fontSize: "14px",
              fontWeight: 600,
            }}
          />
        );
      } else {
        return null;
      }
    }
  );

  return buttonsFiltering;
}

export default FilterButtons;
