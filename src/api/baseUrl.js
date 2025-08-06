import axios from "axios";

const api = axios.create({
  baseURL: "https://backend.aichesusc.org",
});



export default api;