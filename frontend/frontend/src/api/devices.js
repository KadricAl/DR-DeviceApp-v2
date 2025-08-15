import API from "./http";

export const listDevices = () => API.get("/devices/");
export const getDevice = (id) => API.get(`/devices/${id}/`);
export const createDevice = (data) => API.post("/devices/", data);
export const updateDevice = (id, data) => API.put(`/devices/${id}/`, data);
export const deleteDevice = (id) => API.delete(`/devices/${id}/`);

