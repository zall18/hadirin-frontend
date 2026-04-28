import axiosInstance from "./axiosInstance";

export const staffApi = {
  getStaffList: async (eventId) => {
    const response = await axiosInstance.get(`/api/events/${eventId}/staff`);
    return response.data;
  },
  createStaff: async (eventId, data) => {
    const response = await axiosInstance.post(`/api/events/${eventId}/staff`, data);
    return response.data;
  },
  updateStaff: async (eventId, id, data) => {
    const response = await axiosInstance.put(`/api/events/${eventId}/staff/${id}`, data);
    return response.data;
  },
  deleteStaff: async (eventId, id) => {
    const response = await axiosInstance.delete(`/api/events/${eventId}/staff/${id}`);
    return response.data;
  }
};
