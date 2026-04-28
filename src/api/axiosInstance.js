import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Use cookies and keep sessions
});

// Request Interceptor: Attach Token if exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); // Gets from client
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized for Refresh Token Strategy
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Check if the response is 401 and we haven't already retried this request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) throw new Error("No refresh token available");

        // Attempting to refresh token using another API call or let the server refresh via HttpOnly cookies
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        if (response.data?.success && response.data?.data?.tokens?.accessToken) {
          const newToken = response.data.data.tokens.accessToken;
          // Optionally save it depending on implementation, but response already has Set-Cookie.
          Cookies.set('token', newToken); 
          
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, log the user out
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
