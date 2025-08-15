// src/pages/ServicesPage.jsx
import React, { useState, useEffect } from "react";
import { Grid, Paper, Box, Button, Typography, CircularProgress } from "@mui/material";
import Header from "../components/Header";
import ServiceList from "../components/ServiceList";
import ServiceDetails from "../components/ServiceDetails";
import ServiceForm from "../components/ServiceForm";
import { listServices, deleteService } from "../api/services";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [formMode, setFormMode] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await listServices();
      setServices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleAdd = () => { setFormMode("add"); setSelectedService(null); };
  const handleEdit = () => { if (selectedService) setFormMode("edit"); };
  const handleDelete = async () => {
    if (!selectedService) return;
    if (!window.confirm("Are you sure?")) return;
    await deleteService(selectedService.id);
    setSelectedService(null);
    fetchServices();
  };

  const handleFormSaved = () => {
    fetchServices();
    setFormMode(null);
    setSelectedService(null);
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <>
      <Header />
      <Grid container spacing={2} sx={{ mt: 4, justifyContent: "center" }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Button variant="contained" color="primary" onClick={handleAdd}>
                Add Service
              </Button>
            </Box>
            <ServiceList services={services} onSelect={setSelectedService} />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            {formMode ? (
              <ServiceForm
                service={formMode === "edit" ? selectedService : null}
                mode={formMode}
                onSaved={handleFormSaved}
              />
            ) : (
              <>
                {selectedService && (
                  <Box display="flex" gap={1} mb={2}>
                    <Button variant="outlined" color="primary" onClick={handleEdit}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
                  </Box>
                )}
                {selectedService ? (
                  <ServiceDetails service={selectedService} />
                ) : (
                  <Typography>Select a service to view details</Typography>
                )}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
