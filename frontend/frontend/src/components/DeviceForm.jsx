// src/components/DeviceForm.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";

export default function DeviceForm({ device, onSaved, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    brand: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (device) {
      setFormData({
        name: device.name || "",
        type: device.type || "",
        brand: device.brand || "",
        price: device.price || "",
        description: device.description || "",
        picture_url: device.picture_url || "",
      });
    } else {
      setFormData({
        name: "",
        type: "",
        brand: "",
        price: "",
        description: "",
        picture_url: "",
      });
    }
  }, [device]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!formData.name || !formData.type || !formData.brand || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }
    onSaved(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">{device ? "Edit Device" : "Add New Device"}</Typography>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
      />
      <TextField
        label="Brand"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        required
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={3}
      />
      <TextField
        label="Picture URL"
        name="picture_url"
        value={formData.picture_url || ""}
          onChange={handleChange}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          {device ? "Save Changes" : "Add Device"}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
