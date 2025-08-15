import API from "./http"; // or axios instance

export const listCustomers = () => API.get("customers/");
export const getCustomer = (id) => API.get(`customers/${id}/`);
export const createCustomer = (data) => API.post("customers/", data);
export const updateCustomer = (id, data) => API.put(`customers/${id}/`, data);
export const deleteCustomer = (id) => API.delete(`customers/${id}/`);
