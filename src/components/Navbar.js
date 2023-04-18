import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { AppBar, CssBaseline, Toolbar, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import DoorSlidingIcon from "@mui/icons-material/DoorSliding";
import CheckroomIcon from "@mui/icons-material/Checkroom";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#ffffff",
      contrastText: "#000000",
    },
  },
});

export default function Navbar() {
  return (
    <div style={{ margin: "75px" }}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar
          position="fixed"
          color="neutral"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar disableGutters>
            <Link
              to="/closet"
              style={{ textAlign: "center", flexGrow: 1, borderRadius: 2 }}
            >
              <IconButton sx={{ flexDirection: "column" }}>
                <DoorSlidingIcon fontSize="large" />
                <div style={{ fontSize: 13 }}>Closet</div>
              </IconButton>
            </Link>

            <Link
              to="/outfit"
              style={{ textAlign: "center", flexGrow: 1, borderRadius: 2 }}
            >
              <IconButton sx={{ flexDirection: "column" }}>
                <CheckroomIcon fontSize="large" />
                <div style={{ fontSize: 13 }}>Outfits</div>
              </IconButton>
            </Link>

            <Link
              to="/profile"
              style={{ textAlign: "center", flexGrow: 1, borderRadius: 2 }}
            >
              <IconButton sx={{ flexDirection: "column" }}>
                <PersonIcon fontSize="large" />
                <div style={{ fontSize: 13 }}>Profile</div>
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
