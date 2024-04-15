"use client";
import BtnLogin from "@/app/common/Button/BtnLogin";
import InputEmail from "@/app/common/InputEmail/InputEmail";
import InputPassword from "@/app/common/InputPassword/InputPassword";
import Header from "@/app/component/Header/Header";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
function ForgotPassWord(props: any) {
  const [sendMail, setSendMail] = useState(false);
  return (
    <div>
      <Header />
      <div className="flex gap-56 px-20 ">
        <Image src="/hrlogin.svg" alt="" width={550}
      height={550}></Image>
        {!sendMail ? (
          <div className="flex  flex-col gap-5 w-96 mt-20">
            <span className="font-bold text-4xl ">
              Welcome to <span className="text-sky-500">pytalent</span>
            </span>
            <p>
              Enter your email address and we will send you instructions to
              reset your password.
            </p>
            <div>
              <label className="block mb-2 font-bold" htmlFor="inputEmail">
                Email
              </label>
              <InputEmail
                id="inputEmail"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
                placeholder="abc@gmail.com"
              ></InputEmail>
            </div>
            <BtnLogin
              onClick={() => setSendMail(true)}
              className="size-10 border border-gray-300 focus:outline-none focus:border-blue-500 w-full text-white bg-sky-500	"
              text="Send reset email"
            />
            <div className="flex justify-end gap-2">
              <span className="text-sm font-medium ">Take me back to </span>
              <Link href={"./login"}>
                <span className="text-sky-500 flex text-sm underline font-medium justify-end">
                  Sign in
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex  flex-col gap-5 w-96 mt-20">
            <span className="font-bold text-4xl ">Check your email</span>
            <p>
              We have sent an email to limdim@gmail.com. Follow the instructions
              to reset your password. The email will expire in 30 minutes.
            </p>
            <div className="flex justify-start gap-2 mt-5">
              <span className="text-sm font-medium ">Take me back to </span>
              <Link href={"./login"}>
                <span className="text-sky-500 flex text-sm underline font-medium justify-end">
                  Sign in
                </span>
              </Link>
            </div>
            <div className="flex justify-start gap-2">
              <span className="text-sm font-medium ">
                Did not receive our email?{" "}
              </span>
              <Link href={""}>
                <span className="text-sky-500 flex text-sm underline font-medium justify-end">
                  Resend
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassWord;
