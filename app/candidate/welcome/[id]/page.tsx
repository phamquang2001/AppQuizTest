import Header from "@/app/component/Header/Header";
import { Button, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {}
function Welcome(props: Props) {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center ">
        <Image height={500} width={500} src="/logoShoppe.svg" alt="" />
        <div className="w-[500px] flex flex-col items-center gap-3">
          <h1 className="font-semibold text-2xl leading-[56px]">
            Welcome to Shopee assessment
          </h1>
          <p className="text-sm">Thanks for your interest in this position!</p>
          <p className="text-sm">
            Please enter your email adress to access the assessment.
          </p>
          <Input
            className="w-[430px]"
            type="email"
            placeholder="example@gmail.com"
          ></Input>
          <Link href="/candidate/candidate-assessment/2">
            <Button
              className="w-[430px] bg-[#009DBE] py-2 flex items-center justify-center"
              type="primary"
            >
              Continue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
