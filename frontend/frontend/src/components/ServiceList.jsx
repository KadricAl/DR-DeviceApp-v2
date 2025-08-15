// src/components/ServiceList.jsx
import React from "react";
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";

export default function ServiceList({ services = [], onSelect }) {
  if (!services.length) {
    return <Typography sx={{ m: 2 }}>No services found.</Typography>;
  }

  return (
    <List dense>
      {services.map((s) => (
        <ListItemButton key={s.id} onClick={() => onSelect(s)}>
          <ListItemText
            primary={`${s.type.charAt(0).toUpperCase() + s.type.slice(1)} Service`}
            secondary={`Installed Device: ${s.installed_device.serial_number}`}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
