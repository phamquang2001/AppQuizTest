import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "../utils/cookie";
export const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const axiosInstanceCandidate = axios.create();
axiosInstanceCandidate.interceptors.request.use((config) => {
  const token = getCookie("access_token_candidate");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
