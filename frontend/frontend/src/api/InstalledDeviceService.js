import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:8000/api/',});

export const getInstalledDevices = () => API.get('installed_devices/');
export const getInstalledDevice = (id) => API.get('installed_devices/${id}/');
export const createInstalledDevice = (data) => API.post('installed_devices/', data);
export const updateInstalledDevice = (id, data) => API.put('installed_devices/${id}/', data);
export const deleteInstalledDevice = (id) => API.delete('installed_devices/${id}/');
