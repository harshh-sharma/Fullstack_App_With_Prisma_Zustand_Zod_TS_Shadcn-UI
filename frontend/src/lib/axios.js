import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 your backend API URL
  withCredentials: true, // if you’re using cookies
});

// Add token from Zustand/localStorage automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or Zustand store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle global errors (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired / not authorized
      console.error("Unauthorized, logging out...");
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
