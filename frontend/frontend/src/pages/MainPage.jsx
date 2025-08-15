// src/pages/MainPage.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import InstalledDeviceList from "../components/InstalledDeviceList";
import InstalledDeviceDetails from "../components/InstalledDeviceDetails";
import InstalledDeviceForm from "../components/InstalledDeviceForm";
import { Grid, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

export default function MainPage() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [action, setAction] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch customers and devices for validation before adding
  useEffect(() => {
    async function fetchData() {
      try {
        const [customersRes, devicesRes] = await Promise.all([
          axios.get("http://localhost:8000/api/customers/"),
          axios.get("http://localhost:8000/api/devices/"),
        ]);
        setCustomers(customersRes.data);
        setDevices(devicesRes.data);
      } catch (err) {
        setError("Failed to load initial data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Typography
        color="error"
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        {error}
      </Typography>
    );
  }

  return (
    <>
      <Header />
      <Grid
        container
        spacing={2}
        sx={{ mt: 4, justifyContent: "center", alignItems: "flex-start" }}
      >
        {/* Left panel: installed device list */}
        <Grid size={{ xs: 12, md: 3 }}>
          <InstalledDeviceList
            refreshFlag={refreshFlag}
            onSelect={(device) => {
              setSelectedDevice(device);
              setAction("view");
            }}
            onAdd={() => {
              if (customers.length === 0 || devices.length === 0) {
                alert(
                  "Cannot add an installed device — please make sure there is at least one customer and one device in the database."
                );
                return;
              }
              setAction("add");
            }}
            onEdit={(device) => {
              setSelectedDevice(device);
              setAction("edit");
            }}
            onService={(device) => {
              setSelectedDevice(device);
              setAction("service");
            }}
          />
        </Grid>

        {/* Right panel: details or form */}
        <Grid size={{ xs: 12, md: 6 }}>
          {action === "view" && selectedDevice && (
            <InstalledDeviceDetails device={selectedDevice} />
          )}

          {(action === "edit" || action === "add") && (
            <InstalledDeviceForm
              device={action === "edit" ? selectedDevice : null}
              mode={action}
              customers={customers}
              devices={devices}
              onSaved={(updatedDevice) => {
                setAction("view");
                if (updatedDevice) setSelectedDevice(updatedDevice);
                // Trigger reload of list
                setRefreshFlag((f) => f + 1);
              }}
              onCancel={() => setAction("view")}
            />
          )}

          {action === "service" && <div>Service Form Here</div>}
        </Grid>
      </Grid>
    </>
  );
}
