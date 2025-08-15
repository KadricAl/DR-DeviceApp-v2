// src/components/ServiceForm.jsx
import React, { useState, useEffect } from "react";
import { TextField, Button, Stack, MenuItem } from "@mui/material";
import { listInstalledDevices } from "../api/installedDevices";
import { createService, updateService } from "../api/services";

export default function ServiceForm({ service, mode, onSaved }) {
  const [type, setType] = useState(service?.type || "none");
  const [installedDeviceId, setInstalledDeviceId] = useState(service?.installed_device?.id || "");
  const [startDate, setStartDate] = useState(service?.start_date || "");
  const [endDate, setEndDate] = useState(service?.end_date || "");
  const [description, setDescription] = useState(service?.description || "");
  const [price, setPrice] = useState(service?.price || 0);
  const [installedDevices, setInstalledDevices] = useState([]);

  useEffect(() => {
    async function fetchInstalledDevices() {
      try {
        const res = await listInstalledDevices();
        setInstalledDevices(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchInstalledDevices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      type,
      installed_device: installedDeviceId,
      start_date: startDate,
      end_date: endDate || null,
      description,
      price,
    };

    try {
      if (mode === "add") await createService(payload);
      else if (mode === "edit") await updateService(service.id, payload);

      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField select label="Service Type" value={type} onChange={(e) => setType(e.target.value)} required>
          <MenuItem value="request">Request</MenuItem>
          <MenuItem value="maintenance">Maintenance</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
          <MenuItem value="none">None</MenuItem>
        </TextField>

        <TextField
          select
          label="Installed Device"
          value={installedDeviceId}
          onChange={(e) => setInstalledDeviceId(e.target.value)}
          required
        >
          {installedDevices.map((d) => (
            <MenuItem key={d.id} value={d.id}>
              {d.serial_number} — {d.device.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">
          {mode === "add" ? "Add Service" : "Save Changes"}
        </Button>
      </Stack>
    </form>
  );
}
