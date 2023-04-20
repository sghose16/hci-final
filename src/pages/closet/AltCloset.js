import { Box, Button, Container, Grid } from "@mui/material";
import { getAuth } from "firebase/auth";
import {
  child,
  get,
  getDatabase,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useEffect, useState } from "react";
import AddItemDialog from "../../components/AddItemDialog";
import ViewItemDialogContainer from "../../components/ViewItemDialogContainer";

function AltCloset() {
  const [allItems, setAllItems] = useState({});

  const getAllItems = () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${userId}/categories`)).then((snapshot) => {
      if (snapshot.exists()) {
        let newItems = {};
        const categories = Object.values(snapshot.val());

        // initial setup to get all categories even if no items present in category
        categories.forEach((cat) => {
          newItems[cat["name"]] = [];
        });

        setAllItems({ ...newItems });

        get(child(dbRef, `users/${userId}/items`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const items = snapshot.val();

              const itemCategories = Object.keys(items);
              itemCategories.forEach((cat) => {
                newItems[cat] = Object.values(items[cat]);
              });

              setAllItems({ ...newItems });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const handleAddItem = (item, category) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    push(child(dbRef, `users/${userId}/items/${category}`), item)
      .then(() => {
        console.log("Push succeeded.");
      })
      .catch((error) => {
        console.log("Push failed: " + error.message);
      });

    allItems[category] = [...allItems[category], item];
    setAllItems({ ...allItems });
  };

  const handleSaveItem = (item, category) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    // get ref to item with item.id
    get(child(dbRef, `users/${userId}/items/${category}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const oldItems = snapshot.val();
        // find the index of the item to update
        const indexToUpdate = Object.keys(oldItems).find(
          (key) => oldItems[key].id === item.id
        );
        if (indexToUpdate) {
          // update the item in the database
          set(
            child(dbRef, `users/${userId}/items/${category}/${indexToUpdate}`),
            item
          )
            .then(() => {
              console.log("Item updated successfully");
            })
            .catch((error) => {
              console.log("Error updating item:", error.message);
            });
        }
      }
    });

    const newItemsForCategory = allItems[category].map((i) => {
      if (i.id === item.id) {
        return item;
      }
      return i;
    });

    allItems[category] = newItemsForCategory;
    setAllItems({ ...allItems });
  };

  const handleDeleteItem = (item, category) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    // get ref to item with item.id
    get(child(dbRef, `users/${userId}/items/${category}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const allOldItems = snapshot.val();
        // find the index of the item to delete
        const indexToDelete = Object.keys(allOldItems).find(
          (key) => allOldItems[key].id === item.id
        );
        if (indexToDelete) {
          // delete the item from the database
          remove(
            child(dbRef, `users/${userId}/items/${category}/${indexToDelete}`)
          )
            .then(() => {
              console.log("Item deleted successfully");
            })
            .catch((error) => {
              console.log("Error deleting item:", error.message);
            });
        }
      }
    });

    // delete the item from the state
    const newItemsForCategory = allItems[category].filter(
      (i) => i.id !== item.id
    );
    allItems[category] = newItemsForCategory;
    setAllItems({ ...allItems });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <Container>
      {/* title of page */}
      <Grid container>
        <Grid item>
          <h1>Closet</h1>
        </Grid>
      </Grid>

      <ClosetNavBar categories={Object.keys(allItems)} />

      {Object.keys(allItems).map((category) => {
        return (
          <CategorySection
            key={`section ${category}`}
            category={category}
            items={allItems[`${category}`]}
            handleAddItem={handleAddItem}
            handleSaveItem={handleSaveItem}
            handleDeleteItem={handleDeleteItem}
          />
        );
      })}
    </Container>
  );
}

function ClosetNavBar(props) {
  const onClickSection = (category) => {
    document
      .getElementById(`${category}-section`)
      .scrollIntoView({ behavior: "smooth" });
  };

  const getCategories = () => {
    return props.categories.map((cat) => {
      return (
        <Button
          key={`category button ${cat}`}
          onClick={() => onClickSection(cat)}
          className="closet-navbar-item"
        >
          {cat}
        </Button>
      );
    });
  };
  return (
    <Box sx={{ backgroundColor: "#155263" }} className="closet-navbar">
      {getCategories()}
    </Box>
  );
}

function CategorySection(props) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [itemIndex, setItemIndex] = useState(0);

  // adding items to the closet
  const handleAddItem = (item) => {
    props.handleAddItem(item, props.category);
    setIsAddDialogOpen(false);
  };

  // saving changes to item details
  const handleSaveItem = (item) => {
    props.handleSaveItem(item, props.category);
    setIsViewDialogOpen(false);
  };

  // deleting items from closet
  const handleDeleteItem = (item) => {
    props.handleDeleteItem(item, props.category);
    setIsViewDialogOpen(false);
  };

  // displays the image grid
  const renderItems = () => {
    if (props.items.length === 0) {
      return (
        <div style={{ marginLeft: "8px" }}>No {props.category} found.</div>
      );
    }

    return props.items.map((item, index) => {
      return (
        <Grid item xs={4} key={item["id"]}>
          <div
            className="img-container"
            onClick={() => {
              setItemIndex(index);
              setIsViewDialogOpen(true);
            }}
          >
            <img src={item["img"]} className="img-square" />
          </div>
        </Grid>
      );
    });
  };

  return (
    <section id={`${props.category}-section`}>
      <Grid container alignItems={"center"}>
        <Grid item xs={9}>
          <h2 style={{ textTransform: "capitalize" }}>{props.category}</h2>
        </Grid>
        <Grid item xs={3}>
          <Grid container justifyContent={"flex-end"}>
            <Button
              variant="outlined"
              onClick={() => setIsAddDialogOpen(true)}
              className={"gray-circle-btn"}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        {renderItems()}
      </Grid>

      <AddItemDialog
        type={props.category}
        open={isAddDialogOpen}
        handleClose={() => setIsAddDialogOpen(false)}
        handleAdd={handleAddItem}
      />

      <ViewItemDialogContainer
        open={isViewDialogOpen}
        item={props.items[itemIndex]}
        handleSave={handleSaveItem}
        handleClose={() => setIsViewDialogOpen(false)}
        handleDelete={handleDeleteItem}
      />
    </section>
  );
}

export default AltCloset;
