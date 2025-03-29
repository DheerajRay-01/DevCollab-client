import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CORS_ORIGIN ,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let refreshPromise = null; // Stores the refresh request promise

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = axiosInstance.post("/auth/refresh-token")
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
      }

      await refreshPromise; // Wait for token refresh to complete
      return axiosInstance(originalRequest); // Retry the failed request
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
