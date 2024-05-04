// store.ts
import { create } from 'zustand';
import { getDetailAssessment, getListAssessment } from "../api/apiHr";

interface State {
  data: any;
  dataArchive: any;
  dataDetail: any;
  listAssessment: () => Promise<void>;
  listAssessmentArchive: () => Promise<void>;
  getDetailAssessment: (id: number) => Promise<void>;
}

const useStore = create<State>((set) => ({
  data: null,
  dataArchive: null,
  dataDetail: null,
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
  getDetailAssessment: async (id: number) => {
    try {
      const data = await getDetailAssessment(id);
      // console.log(data.data.data.assessment);
      set((state: State) => ({
        ...state,
        dataDetail: data.data.data.assessment,
      }));
    } catch (error: any) {
      set((state: State) => ({
        ...state,
      }));
    }
  },
}));

export default useStore;
