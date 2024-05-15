import axios, { AxiosRequestConfig, all } from "axios";
import { deleteCookie, getCookie } from "../utils/cookie";
export const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error.response.data.code)
  if (error.response.data.code === 401){
    deleteCookie("access_token")
    window.location.href = "/hrpages/login"
  }
  return Promise.reject(error);
});

export const axiosInstanceCandidate = axios.create();
axiosInstanceCandidate.interceptors.request.use((config) => {
  const token = getCookie("access_token_candidate");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// axiosInstanceCandidate.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   console.log(error.response.data.code)
//   if (error.response.data.code === 401){
//     deleteCookie("access_token")
//     window.location.href = "/canđiate/welcome"
//   }
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return Promise.reject(error);
// });
