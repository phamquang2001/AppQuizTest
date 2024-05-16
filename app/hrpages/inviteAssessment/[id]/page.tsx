/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Spin, type MenuProps } from "antd";
import IncludedTest from "@/app/component/IncludedTest/IncludedTest";
import InviteParticipantsModal from "@/app/component/InviteParticipantsModal/InviteParticipantsModal";
import HeaderHr from "@/app/component/HeaderHr/HeaderHr";
import { format, differenceInCalendarDays, parse } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import DashBoard from "@/app/component/Dashboard/Dashboard";
import useStoreDetail from "@/app/Zustand/DetailAssessment";

export default function InviteAssessment() {
  const [isOpenInvite, setIsOpenInvite] = useState(false);
  const idAssess = useParams();
  const getDetail = useStoreDetail((state) => state.getDetailAssessment);
  const data = useStoreDetail((state) => state.data);
  const isLoading = useStoreDetail((state) => state.isLoading);
  const router = useRouter();

  const formatDateRange = (
    startDateStr: string | undefined,
    endDateStr: string | undefined
  ) => {
    if (!startDateStr || !endDateStr) {
      return "";
    }
    const startDate = parse(startDateStr, "dd/MM/yyyy HH:mm:ss", new Date());
    const endDate = parse(endDateStr, "dd/MM/yyyy HH:mm:ss", new Date());
    const formattedStartDate = format(startDateStr, "dd MMMM yyyy");
    const formattedEndDate = format(endDate, "dd MMMM yyyy");
    const daysDifference = differenceInCalendarDays(endDate, startDate);
    const formattedString = `Date: From ${formattedStartDate} to ${formattedEndDate} • ${daysDifference} days`;
    return formattedString;
  };
  const formattedString = formatDateRange(data?.start_date, data?.end_date);
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
  useEffect(() => {
    if (idAssess.id) {
      getDetail(Number(idAssess.id));
    }
  }, [idAssess.id]);
  return (
    <div>
      <HeaderHr />
      {isLoading ? (
        <div className="size-20 focus:outline-none focus:border-blue-500 w-full flex justify-center	items-center">
          <Spin style={{ fontSize: 24, color: "white" }} size="large" />
        </div>
      ) : (
        <div className="mt-[30px] mx-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[10px]">
              <Button
                onClick={() => router.back()}
                icon={
                  <Image
                    className=""
                    alt=""
                    width={30}
                    height={30}
                    src={"/ic-back.svg"}
                  ></Image>
                }
                className="border-none rounded-full btn-create flex items-center"
                style={{ width: "40px" }}
              />
              <div>
                <p className="text-[20px] leading-[28px] font-[500] text-[#111315]">
                  {data?.name}
                </p>
                <p className="text-[12px] leading-[16px] font-[400] text-[#111315]">
                  <span>{formattedString}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Button
                  type="primary"
                  icon={
                    <Image
                      height={25}
                      width={25}
                      alt=""
                      src="/ic-add.svg"
                    ></Image>
                  }
                  className="h-[40px] btn-create flex flex-row  items-center bg-sky-500"
                >
                  Invite participants
                </Button>
              </Dropdown>
              <Button
                icon={
                  <Image
                    height={25}
                    width={25}
                    alt=""
                    src="/ic-menu.svg"
                  ></Image>
                }
                className="border-none rounded-full btn-create flex items-center"
                style={{ width: "40px" }}
              />
            </div>
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-[#fff] via-[#000] to-[#fff] mt-[20px]"></div>
          <IncludedTest game={data?.games} />
          <DashBoard />
          {isOpenInvite && (
            <InviteParticipantsModal
              token={data?.token}
              open={isOpenInvite}
              onClose={() => setIsOpenInvite(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
