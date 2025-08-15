// src/components/DeviceList.jsx
import React, { useState, useEffect } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Button,
  CircularProgress,
  Avatar,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { listDevices, deleteDevice } from "../api/devices";

export default function DeviceList({ onSelect, onAdd, onEdit }) {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const res = await listDevices();
      console.log("Devices API response:", res.data); // debug
      const deviceArray = Array.isArray(res.data) ? res.data : res.data.results || [];
      setDevices(deviceArray);
    } catch (err) {
      console.error("Error fetching devices:", err);
      setDevices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this device?")) return;
    try {
      await deleteDevice(id);
      fetchDevices(); // refresh list
    } catch (err) {
      console.error("Error deleting device:", err);
    }
  };

  if (loading)
    return (
      <Stack alignItems="center" mt={5}>
        <CircularProgress />
      </Stack>
    );

  if (devices.length === 0) return <div>No devices available</div>;

  return (
    <Stack spacing={2}>
      <Button variant="contained" onClick={onAdd}>
        Add Device
      </Button>
      <List>
        {devices.map((device) => (
          <ListItemButton key={device.id} onClick={() => onSelect(device)}>
            {device.picture_url && (
              <Avatar src={device.picture_url} sx={{ mr: 2 }} variant="square" />
            )}
            <ListItemText
              primary={device.name}
              secondary={`${device.brand} — ${device.type}`}
            />
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onEdit(device);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={async (e) => {
                e.stopPropagation();
                await handleDelete(device.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemButton>
        ))}
      </List>
    </Stack>
  );
}
