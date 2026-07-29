import api from "./axios";

export const getDashboardStats = async () => {
  const { data } = await api.get("/analytics/dashboard");
  return data.data;
};
