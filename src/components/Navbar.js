import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { AppBar, CssBaseline, Toolbar, IconButton, Link } from "@mui/material";
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
              href="/closet"
              color="inherit"
              sx={{ textAlign: "center", flexGrow: 1, borderRadius: 2 }}
            >
              <IconButton color="inherit">
                <DoorSlidingIcon fontSize="large" />
              </IconButton>
            </Link>
            <Link
              href="/outfit"
              color="inherit"
              sx={{ textAlign: "center", flexGrow: 1, borderRadius: 2 }}
            >
              <IconButton color="inherit">
                <CheckroomIcon fontSize="large" />
              </IconButton>
            </Link>
            <Link
              href="/profile"
              color="inherit"
              sx={{ textAlign: "center", flexGrow: 1, borderRadius: 2 }}
            >
              <IconButton color="inherit">
                <PersonIcon fontSize="large" />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
