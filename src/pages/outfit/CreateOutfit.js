import React, { useState } from "react";
import { Container } from "@mui/material";
import CreateOutfitOverview from "./CreateOutfitOverview";
import CreateOutfitItemSelector from "./CreateOutfitItemSelector";

function CreateOutfit() {
  // handle switching between the two views
  const [showSelectItem, setShowSelectItem] = useState(false);
  const [chooseCategory, setChooseCategory] = useState("");

  // keep track of what items have been selected
  // MAKE SURE keys are the same as the types listed in CreateOutfitItemSelector
  // and types passed into onClickCategory() in CreateOutfitOverview
  const [items, setItems] = useState({
    tops: [],
    bottoms: [],
    footwear: [],
    accessories: [],
  });

  const handleClickCategory = (type) => {
    setChooseCategory(type);
    setShowSelectItem(true);
  };

  const handleSaveItems = (newItemsInCategory, type) => {
    items[type] = [...newItemsInCategory];
    setItems({ ...items });
    setShowSelectItem(false);
  };

  return (
    <Container>
      {!showSelectItem ? (
        <CreateOutfitOverview
          onClickCategory={handleClickCategory}
          onDelete={setItems}
          items={items}
        />
      ) : (
        <CreateOutfitItemSelector
          type={chooseCategory}
          onBack={() => setShowSelectItem(false)}
          onSave={handleSaveItems}
          selected={items[`${chooseCategory}`]}
        />
      )}
    </Container>
  );
}

export default CreateOutfit;
