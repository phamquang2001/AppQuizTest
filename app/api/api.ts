import axios, { AxiosRequestConfig } from "axios";
import { DataCreateAssessment, LoginRequestBody } from "../utils/type";
import { axiosInstance, axiosInstanceCandidate } from "./axiosInstace";
const urlBase = process.env.URL_BASE;

export const logInHrPages = async (params: any) => {
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
export const getDetailAssessment = async (id: number) => {
  return await axiosInstance.get(`${urlBase}/api/v1/detail-assessment?assessment_id=${id}`);
};
export const inviteCandidate = async (params: any) => {
  return await axiosInstance.post(`${urlBase}/api/v1/invite-candidate`, params);
};
export const candidateLogin = async (token: string , email: string) => {
  return await axios.post(`${urlBase}/api/v1/candidate-login?token=${token}`, {email: email});
};
export const getListGameCandidate = async () => {
  return await axiosInstanceCandidate.get(`${urlBase}/api/v1/candidate/list-game`);
};
export const generateQuestion = async (id: number) => {
  return await axiosInstanceCandidate.post(`${urlBase}/api/v1/candidate/generate-question`, {game_id: id});
};
export const answerQuestion = async (id: number, answer: string, game_id: number , is_skip: number) => {
  return await axiosInstanceCandidate.post(`${urlBase}/api/v1/candidate/answer-question`, {question_id: id , answer: answer , game_id: game_id, is_skip: is_skip});
};
export const finishGame = async (id: number) => {
  return await axiosInstanceCandidate.post(`${urlBase}/api/v1/candidate/finish-game`, {game_id: id });
};
