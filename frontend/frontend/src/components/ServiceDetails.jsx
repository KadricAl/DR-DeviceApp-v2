// src/components/ServiceDetail.jsx
import React from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";

export default function ServiceDetail({ service }) {
  if (!service) return <Typography>No service selected.</Typography>;

  const device = service.installed_device?.device;
  const customer = service.installed_device?.customer;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Service Details
        </Typography>

        <Typography>Service ID: {service.id}</Typography>
        <Typography>Type: {service.type}</Typography>
        
        {service.start_date && (
            <Typography>Start Date: {service.start_date}</Typography>
        )}
        {service.end_date && (
            <Typography>End Date: {service.end_date}</Typography>
        )}
        {service.price !== undefined && (
            <Typography>Price: ${service.price}</Typography>
        )}
        {service.description && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography>Description:</Typography>
            <Typography>{service.description}</Typography>
          </>
        )}

        {service.installed_device && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Installed Device
            </Typography>
            <Typography>Serial Number: {service.installed_device.serial_number}</Typography>
            <Typography>Installation Date: {service.installed_device.installation_date}</Typography>

            {device && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Device Details
                </Typography>
                {device.picture_url && (
                  <Box display="flex" justifyContent="center" mb={2}>
                    <img
                      src={device.picture_url}
                      alt={device.name}
                      style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 4 }}
                    />
                  </Box>
                )}
                <Typography>Name: {device.name}</Typography>
                <Typography>Type: {device.type}</Typography>
                <Typography>Brand: {device.brand}</Typography>
                <Typography>Price: ${device.price}</Typography>
              </>
            )}

            {customer && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Customer Details
                </Typography>
                <Typography>Name: {customer.name}</Typography>
                <Typography>Email: {customer.email}</Typography>
                <Typography>Phone: {customer.phone}</Typography>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
