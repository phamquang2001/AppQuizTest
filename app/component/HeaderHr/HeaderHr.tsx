"use client";
import { logOutHrPages } from "@/app/api/apiHr";
import Logo from "@/app/common/Logo";
import { deleteCookie, getCookie } from "@/app/utils/cookie";
import { Button, Dropdown, Menu } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function HeaderHr(props: any) {
  const [activeButton, setActiveButton] = useState<string>("my-assess");
  const router = useRouter();
  const username = getCookie("gmail")
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  const handleLogout = async () => {
    await logOutHrPages();
    deleteCookie("access_token");
    deleteCookie("gmail");
    router.push("/");
    
  };

  const handleResetPassword = () => {

  };
  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout} key="logout">
        Logout
      </Menu.Item>
      <Menu.Item onClick={handleResetPassword} key="reset-password">
        Reset Password
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="Header-HR flex items-center justify-between sticky top-0 z-10 bg-white">
      <Logo></Logo>
      <div className="flex gap-16 mr-10 mt-2 ">
        <button
          className={
            activeButton === "my-assess" ? "my-assess active" : "my-assess"
          }
          onClick={() => handleButtonClick("my-assess")}
        >
          My assessments
        </button>
        <button
          className={
            activeButton === "test-lib" ? "test-lib active" : "test-lib"
          }
          onClick={() => handleButtonClick("test-lib")}
        >
          Test library
        </button>
      </div>
      <div className="avatar-hr flex mt-2 items-center gap-3 mr-5">
        <span className="text-sky-500 font-medium">{username}</span>
        <Dropdown overlay={menu} trigger={["click"]}>
          <button>
            <Image
              className=""
              src="/avatar.svg"
              alt=""
              width={60}
              height={60}
            ></Image>
          </button>
        </Dropdown>
      </div>
    </div>
  );
}

export default HeaderHr;
