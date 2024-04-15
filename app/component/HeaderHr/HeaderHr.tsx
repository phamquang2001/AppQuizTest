'use client'
import Logo from "@/app/common/Logo/Logo";
import { Image } from "antd";
import React, { useState } from "react";

function HeaderHr(props: any) {
  const [activeButton, setActiveButton] = useState<string>("my-assess");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
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
        <span className="text-sky-500 font-medium">Username</span>
        <Image
          className=""
          src="/avatar.svg"
          alt=""
          width={60}
          height={60}
        ></Image>
      </div>
    </div>
  );
}

export default HeaderHr;
