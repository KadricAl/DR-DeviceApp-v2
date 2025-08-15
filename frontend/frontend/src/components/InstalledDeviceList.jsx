// src/components/InstalledDeviceList.jsx
import React, { useEffect, useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import { listInstalledDevices, deleteInstalledDevice } from "../api/installedDevices";
import axios from "axios";

export default function InstalledDeviceList({ onSelect, onAdd, onEdit, onService, refreshFlag }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await listInstalledDevices();
      const fullItems = await Promise.all(
        res.data.map(async (item) => {
          // fetch full device and customer info if they are just IDs
          const device = item.device?.id ? (await axios.get(`http://localhost:8000/api/devices/${item.device.id}/`)).data : item.device;
          const customer = item.customer?.id ? (await axios.get(`http://localhost:8000/api/customers/${item.customer.id}/`)).data : item.customer;
          return { ...item, device, customer };
        })
      );
      setItems(fullItems);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [refreshFlag]);

  if (loading)
    return (
      <Stack alignItems="center" mt={4}>
        <CircularProgress />
        <Typography>Loading Installed Devices...</Typography>
      </Stack>
    );

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Installed Devices</Typography>
      <Button variant="contained" onClick={onAdd}>
        Add New
      </Button>
      {items.length === 0 ? (
        <Typography>No installed devices found.</Typography>
      ) : (
        <List dense>
          {items.map((it) => (
            <ListItemButton key={it.id} onClick={() => onSelect(it)}>
              <ListItemText
                primary={`${it.serial_number}`}
                secondary={`Installed: ${it.installation_date}`}
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(it);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onService(it);
                }}
              >
                <BuildIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={async (e) => {
                  e.stopPropagation();
                  await deleteInstalledDevice(it.id);
                  load();
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      )}
    </Stack>
  );
}
