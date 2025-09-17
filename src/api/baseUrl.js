import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://backend.aichesusc.org",
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token") || localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;