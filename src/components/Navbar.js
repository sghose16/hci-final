import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import CheckroomIcon from '@mui/icons-material/Checkroom';

const theme = createTheme({
    palette: {
        neutral: {
            main: '#ffffff',
            contrastText: '#000000',
        },
    },
});

export default function Navbar() {
    return (
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <AppBar position="fixed" color="neutral" sx={{ top: 'auto', bottom: 0 }}>
                    <Toolbar disableGutters>
                        <IconButton color="inherit" sx={{ flexGrow: 1 }}>
                            <DoorSlidingIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="inherit" sx={{ flexGrow: 1 }}>
                            <CheckroomIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="inherit" sx={{ flexGrow: 1 }}>
                            <PersonIcon fontSize="large" />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </React.Fragment>
    );
}