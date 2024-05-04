// store.ts
import { create } from "zustand";
import { answerQuestion, finishGame, generateQuestion } from "../api/api";

interface State {
  dataQuestion: any;
  stateQuestion: number;
  time_end: number;
  game_ended : boolean;
  score_end: number
  generateQuestion: (id: number) => Promise<void>;
  answerQuestion: (id: number, answer: string, game_id: number , is_skip: number) => Promise<void>
  finishGame: (id: number) => Promise<void>
}

const useStore = create<State>((set) => ({
  dataQuestion: [],
  stateQuestion: 0,
  time_end: 0,
  game_ended : false,
  score_end: 0,
  generateQuestion: async (id: number) => {
    try {
      const data = await generateQuestion(id);
      set((state: State) => ({
        ...state,
        dataQuestion: data.data.data,
        time_end: data.data.data.time - data.data.data.used_time,
        game_ended: data.data.data.game_ended
      }));
    } catch (error: any) {
      set((state: State) => ({
        ...state,
      }));
    }
  },
  answerQuestion: async (id: number,  answer: string, game_id: number , is_skip: number) => {
    try {
      const data = await answerQuestion(id, answer, game_id, is_skip);
      set((state: State) => ({
        ...state,
        dataQuestion: data.data.data,
        time_end: data.data.data.time - data.data.data.used_time,
        stateQuestion: data.data.data.result
      }));
    } catch (error: any) {
      set((state: State) => ({
        ...state,
      }));
    }
  },
  finishGame: async (id: number) => {
    try {
      const data = await finishGame(id);
      console.log(data)
      set((state: State) => ({
        ...state,
        score_end: data.data.data,
      }));
    } catch (error: any) {
      set((state: State) => ({
        ...state,
      }));
    }
  },
}));

export default useStore;
