"use client";
import HRLogin from "./hrpages/login/page";
import HrPage from "./hrpages/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {
  children: JSX.Element;
}
export default function Home({ children }: Props) {
  return (
    <main className={""}>
      <HrPage />
      <ToastContainer />
    </main>
  );
}
