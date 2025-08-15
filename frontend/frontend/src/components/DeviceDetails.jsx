// src/components/DeviceDetails.jsx
import React from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";

export default function DeviceDetails({ device }) {
  if (!device) return <Typography>No device selected.</Typography>;

  return (
    <Card>
      <CardContent>
        {device.picture_url && (
          <Box display="flex" justifyContent="center" mb={2}>
            <img
              src={device.picture_url}
              alt={device.name}
              style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 4 }}
            />
          </Box>
        )}

        <Typography variant="h6" gutterBottom>
          {device.name}
        </Typography>

        <Typography>Type: {device.type}</Typography>
        <Typography>Brand: {device.brand}</Typography>
        <Typography>Price: ${device.price}</Typography>

        {device.description && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography>Description:</Typography>
            <Typography>{device.description}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
