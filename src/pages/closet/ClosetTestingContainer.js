import React, { Component, useEffect, useState } from "react";
import Closet from "./Closet";
import AltCloset from "./AltCloset";
import { getAuth } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";

function ClosetTestingContainer() {
  const [testValue, setTestValue] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${userId}/testValue`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setTestValue(snapshot.val());
        }
        setIsLoadingData(false);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  if (isLoadingData) {
    return (
      <Container className={"home"}>
        <Box
          height="calc(100vh - 56px)"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container justifyContent={"center"}>
            <Grid item>
              <img src={banner} />
            </Grid>
            <Grid item>
              <CircularProgress color="inherit" />
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }

  return testValue === 0 ? <Closet /> : <AltCloset />;
}

export default ClosetTestingContainer;
