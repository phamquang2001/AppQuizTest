"use client";
import BtnLogin from "@/app/common/Button/BtnLogin";
import InputEmail from "@/app/common/InputEmail/InputEmail";
import InputPassword from "@/app/common/InputPassword/InputPassword";
import Header from "@/app/component/Header/Header";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import useStore from "@/app/Zustand/store";
import { Spin } from "antd";
import { getCookie } from "@/app/utils/cookie";
function HRLogin(props: any) {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const logIn = useStore((state) => state.logIn);
  const logInStatus = useStore((state) => state.logInStatus);
  const loggedIn = useStore((state) => state.loggedIn);
  const message = useStore((state) => state.message);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const access_token = getCookie("access_token");
  const handleChange = (value: string) => {
    setEmail(value);
  };
  const handleSubmit = async () => {
    setIsValidEmail(validateEmail(email));
    try {
      await logIn(email, password);
      setIsLoading(true);
      // Các công việc cần thực hiện khi nút được nhấn
      setTimeout(() => {
        setIsLoading(false); // Sau khi công việc hoàn thành, tắt trạng thái loading
      }, 2000);
    } catch (error) {}
  };
  useEffect(() => {
    if (logInStatus === "rejected") {
      setTimeout(() => {
        toast.error(message);
      }, 2000);
    } else if (access_token && logInStatus === "fulfilled") {
      setTimeout(() => {
        toast.success(message);
        router.push("/hrpages/create-assessment");
      }, 2000);
    }
  }, [logInStatus]);
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  return (
    <div>
      <Header />
      <div className="flex gap-56 px-20 ">
        <Image src="/hrlogin.svg" alt="" width={550} height={550}></Image>
        <div className="flex  flex-col gap-5 mt-20">
          <span className="font-bold text-4xl ">
            Welcome to <span className="text-sky-500">pytalent</span>
          </span>
          <div>
            <label className="block mb-2 font-bold" htmlFor="inputEmail">
              Email
            </label>
            <InputEmail
              value={email}
              onChange={handleChange}
              id="inputEmail"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
              placeholder="abc@gmail.com"
            ></InputEmail>
          </div>
          <div>
            <label className="block mb-2 font-bold" htmlFor="inputPw">
              Password
            </label>
            <InputPassword
              id="inputPw"
              placeholder={"Password"}
              setPassword={setPassword}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
            />
          </div>
          {isLoading ? (
            <div className="size-10 border border-gray-300 focus:outline-none focus:border-blue-500 w-full text-white bg-gray-300 flex justify-center	">
              <Spin style={{ fontSize: 24, color: "white" }} size="default" />
            </div>
          ) : (
            <BtnLogin
              onClick={handleSubmit}
              className="size-10 border border-gray-300 focus:outline-none focus:border-blue-500 w-full text-white bg-sky-500	"
              text="Log in"
            />
          )}

          <Link href={"/hrpages/forgot-password"}>
            <p className="text-sky-500 flex right-0 text-sm underline font-medium justify-end">
              Forgot password?
            </p>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default HRLogin;
