import axios, { AxiosRequestConfig } from "axios";
import { DataCreateAssessment, LoginRequestBody } from "../utils/type";
import { getCookie } from "../utils/cookie";
const axiosInstance = axios.create();
const urlBase = process.env.URL_BASE;
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("access_token")
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
export const CreateAssessment = async (params: any) => {
  return await axiosInstance.post(`${urlBase}/api/v1/create-assessment`, params);
};
export const getListAssessment = async (status: number) => {
  return await axiosInstance.get(`${urlBase}/api/v1/list-assessment?status=${status}`);
};
export const archiveAssessment = async (params: any) => {
  return await axiosInstance.post(`${urlBase}/api/v1/archive-assessment`, params);
};
export const unArchiveAssessment = async (params: any) => {
  return await axiosInstance.post(`${urlBase}/api/v1/unarchive-assessment`, params);
};
export const deleteAssessment = async (params: any) => {
  return await axiosInstance.post(`${urlBase}/api/v1/delete-assessment`, params);
};

