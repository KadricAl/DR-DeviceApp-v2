import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar className="flex justify-between">
            <Typography variant="h6">Device Manager</Typography>
                <Box>
                <Button color="inherit">Devices</Button>
                <Button color="inherit">Services</Button>
                <Button color="inherit">Login</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
