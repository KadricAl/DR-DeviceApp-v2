// src/components/InstalledDeviceDetails.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider, Box, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

export default function InstalledDeviceDetails({ device }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (!device?.id) return;
    async function fetchServices() {
      try {
        const res = await axios.get(`http://localhost:8000/api/services/?installed_device=${device.id}`);
        setServices(res.data);
      } catch (err) {
        console.error("Failed to load service history:", err);
      }
    }
    fetchServices();
  }, [device]);

  if (!device) return <Typography>No installed device selected.</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Installed Device
        </Typography>

        <Typography>Serial Number: {device.serial_number}</Typography>
        <Typography>Installation Date: {device.installation_date}</Typography>

        {device.device && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Device Details
            </Typography>
            {device.device.picture_url && (
              <Box display="flex" justifyContent="center" mb={2}>
                <img
                  src={device.device.picture_url}
                  alt={device.device.name}
                  style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 4 }}
                />
              </Box>
            )}
            <Typography>Name: {device.device.name}</Typography>
            <Typography>Type: {device.device.type}</Typography>
            <Typography>Brand: {device.device.brand}</Typography>
            <Typography>Price: ${device.device.price}</Typography>
            {device.device.description && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography>Description:</Typography>
                <Typography>{device.device.description}</Typography>
              </>
            )}
          </>
        )}

        {device.customer && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Customer Details
            </Typography>
            <Typography>Name: {device.customer.name}</Typography>
            <Typography>Email: {device.customer.email}</Typography>
            <Typography>Phone: {device.customer.phone}</Typography>
          </>
        )}

        {/* Service History */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" gutterBottom>
          Service History
        </Typography>
        {services.length === 0 ? (
          <Typography>No services recorded for this device.</Typography>
        ) : (
          <List>
            {services.map((s) => (
              <ListItem key={s.id} alignItems="flex-start">
                <ListItemText
                  primary={`Service Type: ${s.type} | Price: ${s.price}`}
                  secondary={
                    <>
                      {s.start_date && <Typography>Start Date: {s.start_date}</Typography>}
                      {s.end_date && <Typography>End Date: {s.end_date}</Typography>}
                      {s.final_price !== undefined && <Typography>Price: ${s.final_price}</Typography>}
                      {s.description && (
                        <>
                          <Typography>Description: {s.description}</Typography>
                        </>
                      )}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
