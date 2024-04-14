"use client";
import BtnLogin from "@/app/common/Button/BtnLogin";
import InputEmail from "@/app/common/InputEmail/InputEmail";
import InputPassword from "@/app/common/InputPassword/InputPassword";
import Header from "@/app/component/Header/Header";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
// import "./style.scss";
function HRLogin(props: any) {
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const handleChange = (value: string) => {
    setEmail(value);
  };
  const handleSubmit = () => {
    setIsValidEmail(validateEmail(email));
  };
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  return (
    <div>
      <Header />
      <div className="flex gap-56 px-20 ">
        <Image src="/hrlogin.svg" alt="" width={550}
      height={550}></Image>
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
            {!isValidEmail && (
              <p className="text-red-500 text-sm mt-1">Invalid email format</p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-bold" htmlFor="inputPw">
              Password
            </label>
            <InputPassword
              id="inputPw"
              placeholder={"Password"}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
            />
          </div>
          <BtnLogin
            onClick={handleSubmit}
            className="size-10 border border-gray-300 focus:outline-none focus:border-blue-500 w-full text-white bg-sky-500	"
            text="Log in"
          />
          <Link href={"/hrpages/forgotpassword"}>
            <p className="text-sky-500 flex right-0 text-sm underline font-medium justify-end">
              Forgot password?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HRLogin;
