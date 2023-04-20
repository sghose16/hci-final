import { ArrowBackIosNew } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
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
  Input,
  InputAdornment,
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
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { ref as refStorage } from "firebase/storage";
import { storage } from "../firebase";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAuth } from "firebase/auth";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Settings() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  useEffect(() => {
    // get profile name for user
    onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        const userName = userCredential.displayName;
        setName(userName);
        setOriginalName(userName);
        // const image = userCredential.photoURL;
        // setImg(image);
      }
    });

    // get categories for user
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

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  // keep track of what user is currently adding
  const onChangeNewCategory = (event) => {
    setNewCategory(event.target.value);
  };

  const onChangeNewName = (event) => {
    setName(event.target.value);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login", {state:{message: 'Successfully Logged Out!', variant: 'success'}});
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

  const handleChangeName = async () => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        setOriginalName(name);
        setSnackPack((prev) => [...prev, {message: 'Name Successfully Updated!',  key: new Date().getTime()}]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectedFile = (event) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  async function uploadPicture(file) {
    const storageRef = refStorage(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Do nothing. This callback is used to listen to the progress of the upload.
        },
        (error) => {
          reject(error);
        },
        () => {
          resolve();
        }
      );
    });
    return await getDownloadURL(storageRef);
  }

  const handleUploadFile = async () => {
    const downloadURL = await uploadPicture(file);

    const auth = getAuth();
    updateProfile(auth.currentUser, {
      photoURL: downloadURL,
    })
      .then(() => {
        setFile(null);
        setSnackPack((prev) => [...prev, {message: 'Profile Picture Successfully Updated!',  key: new Date().getTime()}]);
      })
      .catch((error) => {
        console.log(error);
      });
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
        {/* handle changing name of user */}
        <SettingsDropdownItem title="Edit Profile Name">
          <List>
            <ListItem divider>
              <TextField
                size="small"
                value={name}
                onChange={onChangeNewName}
                className="search-bar"
                fullWidth
              />
              <Button
                size="small"
                variant="contained"
                onClick={handleChangeName}
                disabled={originalName === name}
                className="search-add"
                style={{
                  maxWidth: "20%",
                  maxHeight: "20%",
                  minWidth: "18%",
                  minHeight: "18%",
                }}
                sx={{ ml: 1 }}
              >
                Save
              </Button>
            </ListItem>
          </List>
        </SettingsDropdownItem>

        {/* handle changing profile photo */}
        <SettingsDropdownItem title="Edit Profile Photo">
          <List>
            <ListItem divider>
              <div
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <>
                  <IconButton>
                    <label htmlFor="upload-file" style={{ display: "flex" }}>
                      <UploadIcon />
                    </label>
                  </IconButton>

                  <Input
                    id="upload-file"
                    type="file"
                    onChange={handleSelectedFile}
                    style={{ display: "none" }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button variant="contained" component="span">
                          Upload
                        </Button>
                      </InputAdornment>
                    }
                  />
                </>

                <span
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {file == null ? "No file uploaded." : file.name}
                </span>
              </div>

              <Button
                size="small"
                variant="contained"
                onClick={handleUploadFile}
                disabled={file == null}
                className="search-add"
                style={{
                  maxWidth: "20%",
                  maxHeight: "20%",
                  minWidth: "18%",
                  minHeight: "18%",
                }}
                sx={{ ml: 1 }}
              >
                Save
              </Button>
            </ListItem>
          </List>
        </SettingsDropdownItem>

        {/* handle adding more categories */}
        <SettingsDropdownItem title="Show Categories">
          <List>
            <ListItem divider>
              <TextField
                size="small"
                placeholder="Add New Category"
                value={newCategory}
                onChange={onChangeNewCategory}
                className="search-bar"
                fullWidth
              />
              <Button
                size="small"
                variant="contained"
                onClick={addCategory}
                disabled={newCategory.length === 0}
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
                <div key={tool}>
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
        </SettingsDropdownItem>

        {/* handle logging out */}
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
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
      >
        <MuiAlert elevation={20} variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }} >
          {messageInfo ? messageInfo.message : undefined}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

function SettingsDropdownItem(props) {
  const [expand, setExpand] = useState(false);

  return (
    <>
      {/* display section title */}
      <ListItem button>
        {/* the dash is a lie ^^ */}
        <ListItemText
          primary={<b>{props.title}</b>}
          onClick={() => setExpand(!expand)}
          className="search-add"
        />
        <Icon component="label">
          {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Icon>
      </ListItem>
      <Divider />

      {/* display things that go under the title */}
      {expand ? props.children : null}
    </>
  );
}

export default Settings;
