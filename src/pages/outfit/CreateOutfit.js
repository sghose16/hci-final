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
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");

  const handleClickCategory = (type) => {
    setChooseCategory(type);
    setShowSelectItem(true);
  };

  // takes in new STATE of items in a category, not just the ones being added
  const handleSaveItems = (newItemsInCategory, type) => {
    items[type] = [...newItemsInCategory];
    setItems({ ...items });
    setShowSelectItem(false);
  };

  // takes in new STATE of items in a category, not the deleted ones
  const handleDeleteItems = (newItemsInCategory, type) => {
    items[type] = [...newItemsInCategory];
    setItems({ ...items });
  };

  return (
    <Container>
      {!showSelectItem ? (
        <CreateOutfitOverview
          isCreating={true}
          onClickCategory={handleClickCategory}
          onDelete={handleDeleteItems}
          onEditTags={setTags}
          onEditName={setName}
          items={items}
          tags={tags}
          name={name}
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
