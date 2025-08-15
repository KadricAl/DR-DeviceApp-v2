// src/components/CustomerDetails.jsx
import React from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";

export default function CustomerDetails({ customer }) {
  if (!customer) return <Typography>No customer selected.</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>{customer.name}</Typography>
        <Typography>Email: {customer.email}</Typography>
        <Typography>Phone: {customer.phone}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography>Address:</Typography>
        <Typography>{customer.address}</Typography>
      </CardContent>
    </Card>
  );
}
