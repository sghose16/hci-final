import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CreateOutfitItemSelector from "./CreateOutfitItemSelector";
import CreateOutfitOverview from "./CreateOutfitOverview";

import { getAuth } from "firebase/auth";
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
} from "firebase/database";
import { auth } from "../../firebase";

function EditOutfit() {
  const navigate = useNavigate();

  const { id } = useParams();

  // handle switching between the two views
  const [showSelectItem, setShowSelectItem] = useState(false);
  const [chooseCategory, setChooseCategory] = useState("");

  const getItemObject = () => {
    let categories = [];
    const dbRef = ref(
      getDatabase(),
      `users/${auth.currentUser.uid}/categories/`
    );
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        categories = Object.values(data).map((category) => category.name);
      }
    });

    const itemObject = {};
    categories.forEach((category) => {
      itemObject[category] = [];
    });

    return itemObject;
  };

  // keep track of what items have been selected
  // MAKE SURE keys are the same as the types listed in CreateOutfitItemSelector
  // and types passed into onClickCategory() in CreateOutfitOverview
  const [items, setItems] = useState(getItemObject());
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [favorite, setFavorite] = useState(false);

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

          setItems({ ...items, ...outfit["items"] });
          setTags(outfit["tags"] ?? []);
          setName(outfit["name"]);
          setFavorite(outfit["favorite"]);
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

  const handleFavorite = () => {
    setFavorite(!favorite);
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
            favorite: favorite,
            id: id,
          };

          set(child(dbRef, `users/${userId}/outfits/${outfitKey}`), newOutfit)
            .then(() => {
              console.log("Outfit updated successfully");

              // reset state after successful update
              setItems(getItemObject());
              setTags([]);
              setName("");
              setFavorite(false);

              navigate("/outfit", {
                state: {
                  message: "Outfit Successfully Updated!",
                  variant: "success",
                },
              });
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

  const handleDeleteOutfit = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    await get(child(dbRef, `users/${userId}/outfits`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const allOutfits = snapshot.val();

          // find outfit to display
          const outfitKey = Object.keys(allOutfits).find(
            (key) => allOutfits[key].id === id
          );

          if (outfitKey) {
            // delete the outfit from the database
            remove(child(dbRef, `users/${userId}/outfits/${outfitKey}`))
              .then(() => {
                console.log("Outfit deleted successfully");
              })
              .catch((error) => {
                console.log("Error deleting item:", error.message);
              });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/outfit", {
      state: { message: "Outfit Successfully Deleted!", variant: "error" },
    });
  };

  useEffect(() => {
    setItems(getItemObject());
    outfitSetup();
  }, [id]);

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
          onEditFavorite={handleFavorite}
          onSubmit={handleUpdateOutfit}
          onDeleteOutfit={handleDeleteOutfit}
          items={items}
          tags={tags}
          name={name}
          favorite={favorite}
        />
      ) : (
        <CreateOutfitItemSelector
          type={chooseCategory}
          onBack={() => setShowSelectItem(false)}
          onSave={handleSaveItems}
          selected={items[`${chooseCategory}`] ?? []}
        />
      )}
    </Container>
  );
}

export default EditOutfit;
