// store.ts
import { create } from 'zustand';
import { getDetailAssessment } from '../api/apiHr';

interface State {
  data: any;
  isLoading: boolean;
  getDetailAssessment: (id: number) => Promise<void>;
}

const useStoreDetail = create<State>((set) => ({
  data: [],
  isLoading: false,
  getDetailAssessment: async (id: number) => {
    set({ isLoading: true });
    try {
      const data = await getDetailAssessment(id);
      set((state: State) => ({
        ...state,
        data: data?.data?.data?.assessment,
        isLoading: false,
      }));
    } catch (error: any) {
      set((state: State) => ({
        ...state,
        isLoading: false
      }));
    }
  },
}));

export default useStoreDetail;
