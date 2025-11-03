import axios from "axios";

export const $public = axios.create({ baseURL: "http://localhost:8888/auth/" });
export const $protected = axios.create({
  baseURL: "http://localhost:8888/api/",
});

$protected.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
