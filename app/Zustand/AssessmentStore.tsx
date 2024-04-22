// store.ts
import create from "zustand";
import { getListAssessment } from "../api/api";

interface State {
  data: any;
  dataArchive: any
  listAssessment: () => Promise<void>;
  listAssessmentArchive: () => Promise<void>;
}

const useStore = create<State>((set) => ({
  data: null,
  dataArchive: null,
  listAssessment: async () => {
    try {
      const data = await getListAssessment(1);
      set((state: State) => ({
        ...state,
        data: data.data.data.assessments,
      }));
    } catch (error: any) {
      set((state: State) => ({
        ...state,
      }));
    }
  },
  listAssessmentArchive: async () => {
    try {
      const data = await getListAssessment(0);
      set((state: State) => ({
        ...state,
        dataArchive: data.data.data.assessments,
      }));
    } catch (error: any) {
      set((state: State) => ({
        ...state,

      }));
    }
  },
}));

export default useStore;
