// src/lib/axios.ts
import axios from 'axios';
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // ini wajib agar cookie terkirim
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("XSRF-TOKEN");
  if (token && config.headers) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }
  return config;
});

export default axiosInstance;
