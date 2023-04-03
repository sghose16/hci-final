import { Container } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { outfits } from "../../data/data";
import CreateOutfitOverview from "./CreateOutfitOverview";
import CreateOutfitItemSelector from "./CreateOutfitItemSelector";

function EditOutfit() {
  const { id } = useParams();

  // handle switching between the two views
  const [showSelectItem, setShowSelectItem] = useState(false);
  const [chooseCategory, setChooseCategory] = useState("");

  const [outfitInfo, _] = useState(() => {
    return outfits.find((a) => {
      // necessary bc useParams() returns string id, whereas db stores id as a number
      return a.id == id;
    });
  });

  // keep track of what items have been selected
  // MAKE SURE keys are the same as the types listed in CreateOutfitItemSelector
  // and types passed into onClickCategory() in CreateOutfitOverview
  const [items, setItems] = useState({
    tops: outfitInfo["items"]["tops"] ?? [],
    bottoms: outfitInfo["items"]["bottoms"] ?? [],
    footwear: outfitInfo["items"]["footwear"] ?? [],
    accessories: outfitInfo["items"]["accessories"] ?? [],
  });
  const [tags, setTags] = useState(outfitInfo["tags"] ?? []);

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

  console.log(outfitInfo);

  return (
    // basically reuses everything from CreateOutfit
    <Container>
      {!showSelectItem ? (
        <CreateOutfitOverview
          isCreating={false}
          onClickCategory={handleClickCategory}
          onDelete={handleDeleteItems}
          onEditTags={setTags}
          items={items}
          tags={tags}
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

export default EditOutfit;
