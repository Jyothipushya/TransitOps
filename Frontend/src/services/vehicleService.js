import axiosInstance from "./axiosInstance";

export const getVehicles = async () => {
  const response = await axiosInstance.get("/vehicles");
  return response.data;
};

export const getVehicleById = async (id) => {
  const response = await axiosInstance.get(`/vehicles/${id}`);
  return response.data;
};

export const createVehicle = async (vehicleData) => {
  const response = await axiosInstance.post("/vehicles", vehicleData);
  return response.data;
};

export const updateVehicle = async (id, vehicleData) => {
  const response = await axiosInstance.put(`/vehicles/${id}`, vehicleData);
  return response.data;
};

export const deleteVehicle = async (id) => {
  const response = await axiosInstance.delete(`/vehicles/${id}`);
  return response.data;
};