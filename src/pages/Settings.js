import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, Button,TextField, ListItemText, Icon } from "@mui/material";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Divider from "@mui/material/Divider";

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
        navigate("/hci-final");
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
      set(newCategoryRef, { name: newCategory.toLowerCase() }).then(() => {
        setNewCategory("");
      });

      setCategories([...categories, newCategory]);
    }
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
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText
          primary={<b>Show Categories </b>}
          onClick={showCategories}
          className="search-add"
        />
        <Icon
              component="label"
            >
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
              style={{maxWidth: '10%', maxHeight: '10%', minWidth: '10%', minHeight: '10%'}}
              sx={{ml: 1}}
            >
              +
            </Button>
          </ListItem>
          {categories.map((tool) => {
            return (
              <div>
                <ListItem>
                  <ListItemText primary={tool.name} />
                </ListItem>
                <Divider light />
              </div>
            );
          })}
        </List>
      ) : null}
      <ListItem divider>
        <Button  sx={{ml: '40%' }} size="small" variant="contained" onClick={logOut}>
          Log Out
        </Button>
      </ListItem>
    </List>
  );
}
export default Settings;
