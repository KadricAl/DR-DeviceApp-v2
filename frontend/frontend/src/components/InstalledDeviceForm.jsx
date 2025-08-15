// src/components/InstalledDeviceForm.jsx
import React, { useState, useEffect } from "react";
import { TextField, Button, Stack, MenuItem, Typography } from "@mui/material";
import { createInstalledDevice, updateInstalledDevice } from "../api/installedDevices";

export default function InstalledDeviceForm({
  device: installed,
  mode,
  customers,
  devices,
  onSaved,
  onCancel,
}) {
  // safely extract IDs if installed object exists
  const getId = (obj) => (obj && typeof obj === "object" ? obj.id : obj || "");

  const [serialNumber, setSerialNumber] = useState(installed?.serial_number || "");
  const [installationDate, setInstallationDate] = useState(installed?.installation_date || "");
  const [deviceId, setDeviceId] = useState(getId(installed?.device));
  const [customerId, setCustomerId] = useState(getId(installed?.customer));
  const [error, setError] = useState("");

  // update state if `installed` changes (for edit mode)
  useEffect(() => {
    setSerialNumber(installed?.serial_number || "");
    setInstallationDate(installed?.installation_date || "");
    setDeviceId(getId(installed?.device));
    setCustomerId(getId(installed?.customer));
  }, [installed]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deviceId || !customerId) {
      setError("Please select both a device and a customer.");
      return;
    }

    const payload = {
      serial_number: serialNumber,
      installation_date: installationDate,
      device: deviceId,
      customer: customerId,
    };

    try {
      if (mode === "add") {
        await createInstalledDevice(payload);
      } else if (mode === "edit" && installed?.id) {
        await updateInstalledDevice(installed.id, payload);
      }
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      setError("Failed to save installed device.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && <Typography color="error">{error}</Typography>}

        <TextField
          label="Serial Number"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          required
        />

        <TextField
          label="Installation Date"
          type="date"
          value={installationDate}
          onChange={(e) => setInstallationDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          select
          label="Device"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          required
        >
          {Array.isArray(devices) &&
            devices.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.name} — {d.brand} ({d.type})
              </MenuItem>
            ))}
        </TextField>

        <TextField
          select
          label="Customer"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        >
          {Array.isArray(customers) &&
            customers.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name} — {c.email}
              </MenuItem>
            ))}
        </TextField>

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="primary">
            {mode === "add" ? "Add Installed Device" : "Save Changes"}
          </Button>
          {onCancel && (
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  );
}
