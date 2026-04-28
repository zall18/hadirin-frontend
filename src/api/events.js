import axiosInstance from "./axiosInstance";

export const eventsApi = {
  getMyEvents: async () => {
    const response = await axiosInstance.get("/api/events/my-events");
    return response.data;
  },
  getEventOverview: async (id) => {
    // Assuming staff dashboard fetches an event overview
    const response = await axiosInstance.get(`/api/events/${id}`);
    return response.data;
  },
  duplicateEvent: async (id) => {
    const response = await axiosInstance.post(`/api/events/${id}/duplicate`);
    return response.data;
  },
  deleteEvent: async (id) => {
    const response = await axiosInstance.delete(`/api/events/${id}`);
    return response.data;
  },
  togglePublish: async (id) => {
    const response = await axiosInstance.patch(`/api/events/${id}/toggle-publish`);
    return response.data;
  }
};
