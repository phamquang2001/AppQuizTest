"use client";
import React, { useState } from "react";
import { Button, Dropdown, Image, type MenuProps } from "antd";
import Link from "antd/es/typography/Link";
import IncludedTest from "@/app/component/IncludedTest/IncludedTest";
import InviteParticipantsModal from "@/app/component/InviteParticipantsModal/InviteParticipantsModal";
import HeaderHr from "@/app/component/HeaderHr/HeaderHr";

export default function InviteAssessment() {
  const [isOpenInvite, setIsOpenInvite] = useState(false);
  const items: MenuProps["items"] = [
    {
      label: (
        <button onClick={() => setIsOpenInvite(true)}>Invite applicants</button>
      ),
      key: "0",
    },
    {
      label: <button>Invite employees</button>,
      key: "1",
    },
  ];
  return (
    <div>
      <HeaderHr></HeaderHr>
      <div className="mt-[30px] mx-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[10px]">
            <Button
              icon={<img className="w-full h-full" src="/ic-back.svg" />}
              className="border-none rounded-full btn-create flex items-center"
              style={{ width: "40px" }}
            />
            <div>
              <p className="text-[20px] leading-[28px] font-[500] text-[#111315]">
                Assessment for UX Designer
              </p>
              <p className="text-[12px] leading-[16px] font-[400] text-[#111315]">
                <span className="text-[#6F767E]">Date: </span>From 03 March 2022
                to 20 March 2022 • 18 days
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button
                type="primary"
                icon={<img src="/ic-add.svg" />}
                className="h-[40px] btn-create flex flex-row  items-center bg-sky-500"
              >
                Invite participants
              </Button>
            </Dropdown>
            <Button
              icon={<img src="/ic-menu.svg" />}
              className="border-none rounded-full btn-create flex items-center"
              style={{ width: "40px" }}
            />
          </div>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-[#fff] via-[#000] to-[#fff] mt-[20px]"></div>
        <IncludedTest />
        <div className="rounded-2xl border flex justify-center items-center my-8 py-8">
          <img src="/nodata.svg" alt=""></img>
        </div>
        {isOpenInvite && (
          <InviteParticipantsModal
            open={isOpenInvite}
            onClose={() => setIsOpenInvite(false)}
          />
        )}
      </div>
    </div>
  );
}
