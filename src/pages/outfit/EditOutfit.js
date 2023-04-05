import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CreateOutfitOverview from "./CreateOutfitOverview";
import CreateOutfitItemSelector from "./CreateOutfitItemSelector";

import { getDatabase, get, ref, child, set } from "firebase/database";
import { getAuth } from "firebase/auth";

function EditOutfit() {
  const { id } = useParams();

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

  const navigate = useNavigate();

  const outfitSetup = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${userId}/outfits`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const allOutfits = snapshot.val();

          // find outfit to display
          const outfitKey = Object.keys(allOutfits).find(
            (key) => allOutfits[key].id === id
          );
          const outfit = allOutfits[outfitKey];

          setItems(outfit["items"]);
          setTags(outfit["tags"]);
          setName(outfit["name"]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleUpdateOutfit = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${userId}/outfits`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const allOutfits = snapshot.val();

          // find outfit to display
          const outfitKey = Object.keys(allOutfits).find(
            (key) => allOutfits[key].id === id
          );

          const newOutfit = {
            items: items,
            tags: tags,
            name: name,
            id: id,
          };

          set(child(dbRef, `users/${userId}/outfits/${outfitKey}`), newOutfit)
            .then(() => {
              console.log("Outfit updated successfully");

              // reset state after successful update
              setItems({
                tops: [],
                bottoms: [],
                footwear: [],
                accessories: [],
              });
              setTags([]);
              setName("");

              navigate("/outfit");
            })
            .catch((error) => {
              console.log("Error updating outfit: ", error.message);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    outfitSetup();
  });

  return (
    // basically reuses everything from CreateOutfit
    <Container>
      {!showSelectItem ? (
        <CreateOutfitOverview
          isCreating={false}
          onClickCategory={handleClickCategory}
          onDelete={handleDeleteItems}
          onEditTags={setTags}
          onEditName={setName}
          onSubmit={handleUpdateOutfit}
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

export default EditOutfit;
