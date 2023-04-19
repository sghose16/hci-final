import { ArrowBackIosNew } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  List,
  ListItem,
  Button,
  TextField,
  ListItemText,
  Icon,
  IconButton,
  Container,
  Grid,
} from "@mui/material";
import {
  getDatabase,
  onValue,
  ref,
  push,
  set,
  child,
  get,
  remove,
} from "firebase/database";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAuth } from "firebase/auth";
function Settings() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  let [showAll, setShow] = useState(false);

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
    // check if category is even valid
    if (newCategory != null && newCategory.length > 0) {
      const lowerNewCategory = newCategory.toLowerCase();
      // check if category already exists
      if (categories.includes(lowerNewCategory)) {
        setNewCategory("");
      } else {
        const userId = auth.currentUser.uid;
        const dbRef = ref(getDatabase(), `users/${userId}/categories`);

        const newCategoryRef = push(dbRef);
        set(newCategoryRef, { name: lowerNewCategory }).then(() => {
          setNewCategory("");
        });

        setCategories([...categories, lowerNewCategory]);
      }
    }
  };

  const deleteCategory = async (item) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());
    // get ref to item with item.id
    get(child(dbRef, `users/${userId}/categories`)).then((snapshot) => {
      if (snapshot.exists()) {
        const allItems = snapshot.val();

        // find the index of the item to delete
        const indexToDelete = Object.keys(allItems).find(
          (key) => allItems[key].name === item
        );
        if (indexToDelete) {
          // delete the item from the database
          remove(child(dbRef, `users/${userId}/categories/${indexToDelete}`))
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
    setCategories(categories.filter((i) => i !== item));
  };

  const showCategories = () => {
    let currState = showAll;
    setShow(!currState);
  };

  const style = {
    width: "100%",
    bgcolor: "background.paper",
  };

  return (
    <Container>
      <Grid container mt={2}>
        <Grid item>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Button startIcon={<ArrowBackIosNew />}>Back</Button>
          </Link>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item>
          <h1>Settings</h1>
        </Grid>
      </Grid>

      <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem button>
          {/* the dash is a lie ^^ */}
          <ListItemText
            primary={<b>Show Categories</b>}
            onClick={showCategories}
            className="search-add"
          />
          <Icon component="label">
            {showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Icon>
        </ListItem>
        <Divider />
        {showAll ? (
          <List>
            <ListItem divider>
              <TextField
                size="small"
                placeholder="Add New Category"
                value={newCategory}
                onChange={onChange}
                className="search-bar"
                fullWidth
              />
              <Button
                size="small"
                variant="contained"
                onClick={addCategory}
                className="search-add"
                style={{
                  maxWidth: "10%",
                  maxHeight: "10%",
                  minWidth: "10%",
                  minHeight: "10%",
                }}
                sx={{ ml: 1 }}
              >
                +
              </Button>
            </ListItem>
            {categories.map((tool) => {
              return (
                <div>
                  <ListItem>
                    <ListItemText
                      primary={
                        <span style={{ textTransform: "capitalize" }}>
                          {tool}
                        </span>
                      }
                    />
                    <IconButton onClick={() => deleteCategory(tool)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </ListItem>

                  <Divider light />
                </div>
              );
            })}
          </List>
        ) : null}
        <ListItem>
          <Button
            sx={{ ml: "40%" }}
            size="small"
            variant="contained"
            onClick={logOut}
          >
            Log Out
          </Button>
        </ListItem>
      </List>
    </Container>
  );
}
export default Settings;
