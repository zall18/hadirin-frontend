import axiosInstance from "./axiosInstance";

export const authApi = {
  login: async (credentials) => {
    const response = await axiosInstance.post("/api/auth/login", credentials);
    return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post("/api/auth/logout");
    return response.data;
  },
  getProfile: async () => {
    const response = await axiosInstance.get("/api/auth/profile");
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await axiosInstance.put("/api/auth/profile", data);
    return response.data;
  }
};
