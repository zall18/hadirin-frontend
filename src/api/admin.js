import axiosInstance from "./axiosInstance";

export const adminApi = {
  getDashboardOverview: async () => {
    const response = await axiosInstance.get("/api/dashboard/super-admin");
    return response.data;
  },
  getOrganizerOverview: async () => {
    const response = await axiosInstance.get("/api/dashboard/admin/overview");
    return response.data;
  },
  getClients: async () => {
    const response = await axiosInstance.get("/api/admin/");
    return response.data;
  },
  createClient: async (data) => {
    const response = await axiosInstance.post("/api/admin/", data);
    return response.data;
  },
  updateClient: async (id, data) => {
    const response = await axiosInstance.put(`/api/admin/${id}`, data);
    return response.data;
  },
  deleteClient: async (id) => {
    const response = await axiosInstance.delete(`/api/admin/${id}`);
    return response.data;
  },
  toggleClientStatus: async (id) => {
    const response = await axiosInstance.patch(`/api/admin/${id}/toggle-status`);
    return response.data;
  }
};
