// src/components/CustomerForm.jsx
import React, { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";

export default function CustomerForm({ customer, onSaved, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (customer) setFormData(customer);
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaved(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} required />
        <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
        <TextField label="Address" name="address" value={formData.address} onChange={handleChange} multiline rows={3} />
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="primary">Save</Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
        </Stack>
      </Stack>
    </form>
  );
}
