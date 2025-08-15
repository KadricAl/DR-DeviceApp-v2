import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <AppBar position="static">
            <Toolbar className="flex justify-between">
            <Typography variant="h6">Device Manager</Typography>
                <Box>
                <Button color="inherit" onClick={() => navigate("/")}>Installed Devices</Button>
                <Button color="inherit" onClick={() => navigate("/customers")}>Customers</Button>
                 <Button color="inherit" onClick={() => navigate("/devices")}>Devices</Button>
                <Button color="inherit" onClick={() => navigate("/services")}>Services</Button>
                <Button color="inherit">Login</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
