import axiosInstance from "./axiosInstance";

export const getDashboard = async () => {
  const response = await axiosInstance.get("/dashboard");
  return response.data.dashboard;
};