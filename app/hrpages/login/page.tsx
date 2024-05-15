"use client";
import BtnLogin from "@/app/common/BtnLogin";
import InputEmail from "@/app/common/InputEmail";
import InputPassword from "@/app/common/InputPassword";
import Header from "@/app/component/Header/Header";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Input, Spin, Button, Form } from "antd";
import { SubmitHandler} from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { logInHrPages } from "@/app/api/apiHr";
import { setCookie } from "@/app/utils/cookie";

type Inputs = {
  email: string;
  password: string;
};
function HRLogin(props: any) {
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: logInHrPages,
    onSuccess: async (data) => {
      setCookie("access_token", data.data.data.access_token);
      setCookie("gmail", data.data.data.email);
      await router.push("/hrpages/createAssessment");
      toast.success(data.data.message);
    },
    onError: (data: any) => {
      toast.error(data.response.data.message);
    },
  });
  const onFinish: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    loginMutation.mutate(data);
  };
  const loading = loginMutation.isPending;
 
  return (
    <div>
      <Header />
      <div className="flex gap-56 px-20 ">
        <Image src="/hrlogin.svg" alt="" width={550} height={550}></Image>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <div className="flex  flex-col gap-5 mt-20">
            <span className="font-bold text-4xl ">
              Welcome to <span className="text-sky-500">pytalent</span>
            </span>
            <div>
              <label className="block mb-2 font-bold" htmlFor="inputEmail">
                Email
              </label>

              <Form.Item
                className="mb-0"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  id="inputEmail"
                  className="site-form-item-icon border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
                  placeholder="abc@gmail.com"
                />
              </Form.Item>
            </div>
            <div>
              <label className="block mb-2 font-bold" htmlFor="inputPw">
                Password
              </label>
              <Form.Item
                className="mb-0"
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
            </div>
            {loading ? (
              <div className="size-10 border border-gray-300 focus:outline-none focus:border-blue-500 w-full text-white bg-gray-300 flex justify-center	">
                <Spin style={{ fontSize: 24, color: "white" }} size="default" />
              </div>
            ) : (
              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button size-10 border border-gray-300 focus:outline-none focus:border-blue-500 w-full text-white bg-sky-500 hover:bg-sky-600 py-2 rounded-md cursor-pointer"
                >
                  Log in
                </Button>
              </Form.Item>
            )}

            <Link href={"/hrpages/forgotPassword"}>
              <p className="text-sky-500 flex right-0 text-sm underline font-medium justify-end">
                Forgot password?
              </p>
            </Link>
          </div>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default HRLogin;
