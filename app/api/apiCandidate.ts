import axios from "axios";
import { axiosInstanceCandidate } from "./axiosInstace";
import { answerType, loginCandidate } from "../utils/type";
const urlBase = process.env.URL_BASE;

export const candidateLogin = async (params: loginCandidate) => {
    return await axios.post(`${urlBase}/api/v1/candidate-login?token=${params.token}`, {email: params.email});
  };
  export const getListGameCandidate = async () => {
    return await axiosInstanceCandidate.get(`${urlBase}/api/v1/candidate/list-game`);
  };
  export const generateQuestion = async (id: number) => {
    return await axiosInstanceCandidate.post(`${urlBase}/api/v1/candidate/generate-question`, {game_id: id});
  };
  export const answerQuestion = async (params : answerType) => {
    return await axiosInstanceCandidate.post(`${urlBase}/api/v1/candidate/answer-question`, {question_id: params.id , answer: params.answer , game_id: params.game_id, is_skip: params.is_skip});
  };
  export const finishGame = async (id: number) => {
    return await axiosInstanceCandidate.post(`${urlBase}/api/v1/candidate/finish-game`, {game_id: id });
  };
  