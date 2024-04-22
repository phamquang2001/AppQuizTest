// store.ts
import create from "zustand";
import { logInHrPages } from "../api/api";
import { setCookie } from "../utils/cookie";

interface State {
  loggedIn: boolean;
  logInError: string | null;
  logInStatus: "idle" | "pending" | "fulfilled" | "rejected";
  data: null;
  message: string;
  logIn: (email: string, password: string) => Promise<void>;
}

const useStore = create<State>((set) => ({
  loggedIn: false,
  logInError: null,
  logInStatus: "idle",
  data: null,
  message: "",
  logIn: async (email, password) => {
    set({ logInStatus: "pending" });
    try {
      const data = await logInHrPages({ email, password });
      setCookie("access_token", data.data.data.access_token)
      setCookie("gmail", data.data.data.email)
      set((state: State) => ({
        ...state,
        loggedIn: true,
        logInError: null,
        logInStatus: "fulfilled",
        data: data.data,
        message: data.data.message,
      }));
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      set((state: State) => ({
        ...state,
        loggedIn: false,
        logInError: "Login failed",
        logInStatus: "rejected",
        message: error?.response?.data?.message,
      }));
    }
  },
}));

export default useStore;
