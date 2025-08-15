// src/pages/DevicePage.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import DeviceList from "../components/DeviceList";
import DeviceDetails from "../components/DeviceDetails";
import DeviceForm from "../components/DeviceForm";
import { Grid } from "@mui/material";

export default function DevicePage() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [action, setAction] = useState(null); // 'view' | 'edit' | 'add'

  return (
    <>
      <Header />
      <Grid
        container
        spacing={2}
        sx={{
          p: 4,
          justifyContent: "center",
        }}
      >
        {/* Left panel: Device list */}
        <Grid size={{ xs: 12, md: 3 }}>
          <DeviceList
            onSelect={(device) => {
              setSelectedDevice(device);
              setAction("view");
            }}
            onAdd={() => {
              setSelectedDevice(null);
              setAction("add");
            }}
            onEdit={(device) => {
              setSelectedDevice(device);
              setAction("edit");
            }}
          />
        </Grid>

        {/* Right panel: Device details or form */}
        <Grid size={{ xs: 12, md: 6 }}>
          {action === "view" && selectedDevice && (
            <DeviceDetails device={selectedDevice} />
          )}
          {action === "edit" && selectedDevice && (
            <DeviceForm device={selectedDevice} mode="edit" />
          )}
          {action === "add" && <DeviceForm mode="add" />}
        </Grid>
      </Grid>
    </>
  );
}
