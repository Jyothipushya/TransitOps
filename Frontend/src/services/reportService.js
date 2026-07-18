import axiosInstance from "./axiosInstance";

export const getReports = async () => {
  const response = await axiosInstance.get("/reports");
  return response.data;
};