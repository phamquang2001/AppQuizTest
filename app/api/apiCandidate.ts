import axios from "axios";
import { axiosInstanceCandidate } from "./axiosInstace";
const urlBase = process.env.URL_BASE;

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
  