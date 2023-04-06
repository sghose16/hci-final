import settings from "../assets/settings.png";
import john from "../assets/john.png";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function Profile() {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        //User is signed in
        const userName = userCredential.displayName;
        setName(userName);

        console.log("userName profile", userName);
      } else {
        // User is signed out
        console.log("user is logged out");
      }
    });
  }, []);

  const handleClick = (event) => {
    navigate("/settings");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          width: "auto",
          borderRadius: 1,
        }}
      >
        <div className="settings">
          <img src={settings} alt={settings} onClick={handleClick} />
        </div>
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
        <img src={john} />
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
        <div className="name"> {name} </div>
      </Box>
    </>
  );
}

export default Profile;
