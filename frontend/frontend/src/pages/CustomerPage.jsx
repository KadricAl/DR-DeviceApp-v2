// src/pages/CustomersPage.jsx
import React, { useState, useEffect } from "react";
import { Grid, Paper, Box, Button, Typography, CircularProgress } from "@mui/material";
import Header from "../components/Header";
import CustomerList from "../components/CustomerList";
import CustomerDetails from "../components/CustomerDetails";
import CustomerForm from "../components/CustomerForm";
import axios from "axios";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formMode, setFormMode] = useState(null); // "add" | "edit"
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/customers/");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, []);

  const handleAdd = () => { setFormMode("add"); setSelectedCustomer(null); };
  const handleEdit = () => { if (selectedCustomer) setFormMode("edit"); };
  const handleDelete = async () => {
    if (!selectedCustomer) return;
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`http://localhost:8000/api/customers/${selectedCustomer.id}/`);
    setSelectedCustomer(null);
    fetchCustomers();
  };

  const handleFormSaved = async (data) => {
    try {
      if (formMode === "add") await axios.post("http://localhost:8000/api/customers/", data);
      else if (formMode === "edit") await axios.put(`http://localhost:8000/api/customers/${selectedCustomer.id}/`, data);
      fetchCustomers();
      setFormMode(null);
      setSelectedCustomer(null);
    } catch (err) { console.error(err); }
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <>
      <Header />
      <Grid container spacing={2} sx={{ mt: 4, justifyContent: "center" }}>
        {/* Left: Customer List */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Button variant="contained" color="primary" onClick={handleAdd}>Add Customer</Button>
            </Box>
            <CustomerList customers={customers} onSelect={setSelectedCustomer} />
          </Paper>
        </Grid>

        {/* Right: Details or Form */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            {formMode ? (
              <CustomerForm
                customer={formMode === "edit" ? selectedCustomer : null}
                onSaved={handleFormSaved}
                onCancel={() => setFormMode(null)}
              />
            ) : (
              <>
                {selectedCustomer && (
                  <Box display="flex" gap={1} mb={2}>
                    <Button variant="outlined" color="primary" onClick={handleEdit}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
                  </Box>
                )}
                {selectedCustomer ? (
                  <CustomerDetails customer={selectedCustomer} />
                ) : (
                  <Typography>Select a customer to view details</Typography>
                )}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
