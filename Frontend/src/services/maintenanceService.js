import axiosInstance from "./axiosInstance";

export const getMaintenance = async () => {
  const response = await axiosInstance.get("/maintenance");
  return response.data;
};

export const getMaintenanceById = async (id) => {
  const response = await axiosInstance.get(`/maintenance/${id}`);
  return response.data;
};

export const createMaintenance = async (maintenanceData) => {
  const response = await axiosInstance.post(
    "/maintenance",
    maintenanceData
  );
  return response.data;
};

export const updateMaintenance = async (id, maintenanceData) => {
  const response = await axiosInstance.put(
    `/maintenance/${id}`,
    maintenanceData
  );
  return response.data;
};

export const deleteMaintenance = async (id) => {
  const response = await axiosInstance.delete(
    `/maintenance/${id}`
  );
  return response.data;
};