// store.ts
import { create } from 'zustand';
import {  getListGameCandidate } from "../api/api";

interface State {
  dataListGame: any;
  getListGameCandidate: () => Promise<void>;
}

const useStore = create<State>((set) => ({
  dataListGame: [],
  getListGameCandidate: async () => {
    try {
      const data = await getListGameCandidate();
      set((state: State) => ({
        ...state,
        dataListGame: data.data.data.games,
      }));
    } catch (error: any) {
      set((state: State) => ({
        ...state,
      }));
    }
  },
}));

export default useStore;
