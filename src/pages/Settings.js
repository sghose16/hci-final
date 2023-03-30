import { useState } from "react";
import { useNavigate } from 'react-router-dom';


import { Box, List, ListItem, Button, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

function Settings(){
  const navigate = useNavigate();

    const [categories, setCategory] = useState([
        { name: "Tops"},
        { name: "Bottoms"},
        { name: "Footwear"},
        { name: "Accessories" },
      ]);
    const [newCategory, setNewCategory] = useState("");
    let [showCategory, setShow] = useState(true);
      

  // keep track of what user is currently adding
    const onChange = (event) => {
        setNewCategory(event.target.value);
    };

    const logOut = () => {               
        navigate("/hci-final");
    }

    const addCategory = () => {
        if (newCategory != null && newCategory.length > 0) {
            const toBeAdded =  { name: newCategory,};
            // check that the category doesn't already exist in the dropdown
            if (categories.find((elem) => elem.name === toBeAdded.name) != null) {
                alert("You already have this category");
            } else {
                categories.push(toBeAdded);
                categories.sort((a, b) => {return a.name.localeCompare(b.name);});
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
        <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    mt: 5,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}>
            <Button size="small" variant='contained' onClick={showCategories} className="search-add">
                Show Categories
            </Button>

            </Box>
            <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}>
            {showCategory ? 
            (<List>
            {categories.map(tool => {
                return(     
                <ListItem>
                    <ListItemText primary={tool.name}/>
                </ListItem>)
            })}
            </List> ) : null}
        </Box>


        <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}>
        <input
            type="text"
            name="category-name"
            placeholder="New Category"
            value={newCategory}
            onChange={onChange}
            className="search-bar"
          /> 
               <Box sx={{
                    mx: 3
                }}>
                     <Button  size="small" variant='contained' onClick={addCategory} className="search-add" >
                        +
                    </Button>

                </Box>


        </Box>




            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}>
            <Button size="small" variant="contained" onClick={logOut} >Log Out</Button> 
            </Box>
        </>

    );
} 
export default Settings;