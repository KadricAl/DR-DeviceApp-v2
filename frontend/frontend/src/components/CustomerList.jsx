// src/components/CustomerList.jsx
import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export default function CustomerList({ customers = [], onSelect }) {
  if (!customers.length) {
    return <Typography sx={{ m: 2 }}>No customers found.</Typography>;
  }

  return (
    <List dense>
      {customers.map((customer) => (
        <ListItemButton key={customer.id} onClick={() => onSelect(customer)}>
          <ListItemText
            primary={customer.name}
            secondary={customer.email}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
