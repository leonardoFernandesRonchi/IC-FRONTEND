import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://ic-backend-production-6479.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
