import axiosInstance from "./axiosInstance";

export const getFuelLogs = async () => {
  const response = await axiosInstance.get("/fuel");
  return response.data;
};

export const getFuelById = async (id) => {
  const response = await axiosInstance.get(`/fuel/${id}`);
  return response.data;
};

export const createFuel = async (fuelData) => {
  const response = await axiosInstance.post("/fuel", fuelData);
  return response.data;
};

export const updateFuel = async (id, fuelData) => {
  const response = await axiosInstance.put(`/fuel/${id}`, fuelData);
  return response.data;
};

export const deleteFuel = async (id) => {
  const response = await axiosInstance.delete(`/fuel/${id}`);
  return response.data;
};
