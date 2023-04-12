import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { List, ListItem, Button, ListItemText, Icon } from "@mui/material";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Divider from "@mui/material/Divider";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#ffffff",
      contrastText: "#000000",
    },
  },
});

function Settings() {
  const navigate = useNavigate();

  const [categories, setCategory] = useState([
    { name: "Accessories" },
    { name: "Bottoms" },
    { name: "Footwear" },
    { name: "Tops" },
  ]);
  const [newCategory, setNewCategory] = useState("");
  let [showAll, setShow] = useState(false);

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

  const addCategory = () => {
    if (newCategory != null && newCategory.length > 0) {
      const toBeAdded = { name: newCategory };
      // check that the category doesn't already exist in the dropdown
      if (categories.find((elem) => elem.name === toBeAdded.name) != null) {
        alert("You already have this category");
      } else {
        categories.push(toBeAdded);
        categories.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        setCategory([...categories]);
        setNewCategory("");
      }
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
          primary="Show Categories"
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
            <input
              type="text"
              name="category-name"
              placeholder="New Category"
              value={newCategory}
              onChange={onChange}
              className="search-bar"
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
