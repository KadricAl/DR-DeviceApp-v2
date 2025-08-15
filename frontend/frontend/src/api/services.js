// src/api/services.js
import API from "./http"; // your axios instance

export const listServices = () => API.get("services/");            // GET all services
export const getService = (id) => API.get(`services/${id}/`);     // GET single service
export const createService = (payload) => API.post("services/", payload); // POST new service
export const updateService = (id, payload) => API.put(`services/${id}/`, payload); // PUT update
export const deleteService = (id) => API.delete(`services/${id}/`); // DELETE service
