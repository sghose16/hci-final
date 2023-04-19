import React from 'react';
import { Button, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


/**
 * Buttons that show which filters are being applied.
 * @props       filterLabel: dictionary of filters
 *              handleDeleteFilter: remove filter if Button is clicked
 *
 */
function FilterButtons(props){
  const buttonsFiltering = Object.entries(props.filterLabel).map(([key, value]) => {
    if (key === "brand" && value.length > 0) {
      return value.map((brand) => (
        <Button
          key={brand}
          variant="outlined"
          color="secondary"
          onClick={() => props.handleDeleteFilter(key, brand)}
        >
          {`Brand: ${brand} `}
          <CloseIcon />
        </Button>
      ));
    } else if (key === "tags" && value.length > 0) {
      return value.map((tag) => (
        <Button
          key={tag}
          variant="outlined"
          color="secondary"
          onClick={() => props.handleDeleteFilter(key, tag)}
        >
          {`Tag: ${tag} `}
          <CloseIcon />
        </Button>
      ));
    } else if (key === "favorite" && value !== false) {
      return (
        <Button
          key={key}
          variant="outlined"
          color="secondary"
          onClick={() => props.handleDeleteFilter(key, value)}
        >
          {`Favorites`}
          <CloseIcon />
        </Button>
      );
    } else {
      return null;
    }
  });

  return (
    <div>
         <IconButton> {buttonsFiltering}</IconButton>

    </div>
  );
};

export default FilterButtons;

