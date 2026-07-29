import api from "./axios";

export const getComplaints = async (params: Record<string, unknown>) => {
  const { data } = await api.get("/complaints", { params });
  return data.data;
};

export const getComplaint = async (id: string) => {
  const { data } = await api.get(`/complaints/${id}`);
  return data.data;
};

export const createComplaint = async (payload: unknown) => {
  const { data } = await api.post("/complaints", payload);
  return data.data;
};

export const updateComplaintStatus = async (
  id: string,
  status: string
) => {
  const { data } = await api.patch(`/complaints/${id}/status`, {
    status,
  });

  return data.data;
};

export const assignComplaint = async (
  id: string,
  investigatorId: string
) => {
  const { data } = await api.patch(`/complaints/${id}/assign`, {
    assigned_to: investigatorId,
  });

  return data.data;
};
