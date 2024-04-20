import axios, { AxiosRequestConfig } from "axios";
import { DataCreateAssessment, LoginRequestBody } from "../utils/type";
import { getCookie } from "../utils/cookie";
const axiosInstance = axios.create();
const urlBase = process.env.URL_BASE;
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("access_token")
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const logInHrPages = async (params: LoginRequestBody) => {
  return await axiosInstance.post(`${urlBase}/api/v1/login`, params);
};
export const logOutHrPages = async () => {
  return await axiosInstance.post(`${urlBase}/api/v1/logout`);
};
export const CreateAssessment = async (params : DataCreateAssessment) => {
  return await axiosInstance.post(`${urlBase}/api/v1/create-assessment`, params);
};
