import { Button } from '@mui/material';
import { useState } from "react";

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

function Settings(){
    const [categories, setCategory] = useState([
        { name: "Tops"},
        { name: "Bottoms"},
        { name: "Footwear"},
        { name: "Accessories" },
      ]);
    const [newCategory, setNewCategory] = useState("");
    let [showCategory, setShow] = useState(false);
      

  // keep track of what user is currently adding
    const onChange = (event) => {
        setNewCategory(event.target.value);
    };

  const addCategory = () => {
        if (newCategory != null && newCategory.length > 0) {
          const toBeAdded =  {
            name: newCategory,
          };
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
        let currState = showCategory;
        setShow(!currState);
        console.log(showCategory);
    };


    return (
        <>

        <input
            type="text"
            name="category-name"
            placeholder="Name of category"
            value={newCategory}
            onChange={onChange}
            className="search-bar"
          />
        <Button size="small" variant='contained' onClick={addCategory} className="search-add" >
          +
        </Button>

          <Button size="small" variant='contained' onClick={showCategories} className="search-add" >
            Show Categories
          </Button>


         {showCategory ? 
         (<List>
         {categories.map(tool => {
            return(     
            <ListItem>
                <ListItemText primary={tool.name}/>
            </ListItem>)

         })}
         </List> ) : null}


            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}>
             <Button size="small" variant="contained">Log Out</Button> 
            </Box>
        </>

    );
} 
export default Settings;