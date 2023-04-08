import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, List, ListItem, Button, ListItemText } from "@mui/material";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { getDatabase, ref, onValue, push, set } from "firebase/database";

function Settings() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  let [showAll, setShow] = useState(true);

  useEffect(() => {
    const dbRef = ref(
      getDatabase(),
      `users/${auth.currentUser.uid}/categories/`
    );
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCategories(Object.values(data).map((category) => category.name));
      }
    });
  }, []);

  // keep track of what user is currently adding
  const onChange = (event) => {
    setNewCategory(event.target.value);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {});
  };

  const addCategory = async () => {
    if (categories.includes(newCategory)) {
      setNewCategory("");
    } else if (newCategory != null && newCategory.length > 0) {
      const userId = auth.currentUser.uid;
      const dbRef = ref(getDatabase(), `users/${userId}/categories`);

      const newCategoryRef = push(dbRef);
      set(newCategoryRef, { name: newCategory }).then(() => {
        setNewCategory("");
      });

      setCategories([...categories, newCategory]);
    }
  };

  const showCategories = () => {
    let currState = showAll;
    setShow(!currState);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          mt: 5,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={showCategories}
          className="search-add"
        >
          Show Categories
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        {showAll ? (
          <List>
            {categories.map((category) => {
              return (
                <ListItem key={category}>
                  <ListItemText primary={category} />
                </ListItem>
              );
            })}
          </List>
        ) : null}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <input
          type="text"
          name="category-name"
          placeholder="New Category"
          value={newCategory}
          onChange={onChange}
          className="search-bar"
        />
        <Box
          sx={{
            mx: 3,
          }}
        >
          <Button
            size="small"
            variant="contained"
            onClick={addCategory}
            className="search-add"
          >
            +
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Button size="small" variant="contained" onClick={logOut}>
          Log Out
        </Button>
      </Box>
    </>
  );
}
export default Settings;
