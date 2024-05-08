"use client";
import { candidateLogin } from "@/app/api/apiCandidate";
import Header from "@/app/component/Header/Header";
import { setCookie } from "@/app/utils/cookie";
import { useMutation } from "@tanstack/react-query";
import { Button, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {}
export default function Welcome() {
  const router = useRouter();
  const token = useParams().id;
  const [email, setEmail] = useState("");
  const logIn = useMutation({
    mutationFn: candidateLogin,
    onSuccess: (data) => {
      toast.success(data.data.message);
      router.push(`/candidate/candidate-assessment/${token}`);
      setCookie("access_token_candidate", data.data.data.access_token);
    },
    onError: (data: any) => {
      console.log(data);
      toast.error(data.response.data.message);
    },
  });
  const handleLogin = async () => {
    logIn.mutate({ token: token as string, email: email });
  };
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center ">
        <Image height={450} width={450} src="/logoShoppe.svg" alt="" />
        <div className="w-[500px] flex flex-col items-center gap-3">
          <h1 className="font-semibold text-2xl leading-[56px]">
            Welcome to Shopee assessment
          </h1>
          <p className="text-sm">Thanks for your interest in this position!</p>
          <p className="text-sm">
            Please enter your email adress to access the assessment.
          </p>
          <Input
            className="w-[430px] p-[10px] my-2"
            type="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          ></Input>
          <Button
            className="w-[430px] bg-[#009DBE] py-2 flex items-center justify-center h-10"
            type="primary"
            onClick={() => handleLogin()}
          >
            Continue
          </Button>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
