// utils/axiosPrivate.ts
import config from "@/config";
import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: config.api,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor to attach token from localStorage
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 🔥 Manually attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosPrivate;
