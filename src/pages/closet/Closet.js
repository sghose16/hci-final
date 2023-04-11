import React, { useEffect, useState } from "react";

import { Container, Grid } from "@mui/material";
import DisplayItemsContainer from "../../components/DisplayItemsContainer";

import { getDatabase, onValue, ref } from "firebase/database";
import { auth } from "../../firebase";

function Closet() {
  const [categories, setCategories] = useState([]);

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

  return (
    <Container>
      {/* title of page */}
      <Grid container>
        <Grid item>
          <h1>Closet</h1>
        </Grid>
      </Grid>

      {/* display items */}
      <Grid container rowSpacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} key={category}>
            <DisplayItemsContainer title={category} />
          </Grid>
        ))}

      </Grid>
    </Container>
  );
}

export default Closet;
