import axios from "axios";

const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiBaseUrl, 
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
