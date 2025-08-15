import API from "./http"; // your axios instance

export const listInstalledDevices = () => API.get("installed_devices/");
export const getInstalledDevice = (id) => API.get(`installed_devices/${id}/`);
export const createInstalledDevice = (payload) => API.post("installed_devices/", payload);
export const updateInstalledDevice = (id, payload) => API.put(`installed_devices/${id}/`, payload);
export const deleteInstalledDevice = (id) => API.delete(`installed_devices/${id}/`);
