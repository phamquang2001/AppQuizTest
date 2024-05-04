"use client";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, type MenuProps } from "antd";
import IncludedTest from "@/app/component/IncludedTest/IncludedTest";
import InviteParticipantsModal from "@/app/component/InviteParticipantsModal/InviteParticipantsModal";
import HeaderHr from "@/app/component/HeaderHr/HeaderHr";
import { format, differenceInCalendarDays, parse } from "date-fns";
import { useParams } from "next/navigation";
import useStore from "@/app/Zustand/AssessmentStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getDetailAssessment } from "@/app/api/apiHr";

export default function InviteAssessment() {
  const [isOpenInvite, setIsOpenInvite] = useState(false);
  const idAssess = useParams();
  const [dataDetail, setDataDetail] = useState<any>({});
  const router = useRouter();
  const {data: getDetailAssess, isLoading} = useQuery({
    queryKey: ["getDetailAssessment"],
    queryFn: () => getDetailAssessment(Number(idAssess.id)),
  });
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
  const formattedString = formatDateRange(
    dataDetail?.start_date,
    dataDetail?.end_date
  );
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
  useEffect(()=> {
    setDataDetail(getDetailAssess?.data?.data?.assessment)
  },[getDetailAssess])  
  return (
    <div>
      <HeaderHr></HeaderHr>
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
                {dataDetail?.name}
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
                <Image height={25} width={25} alt="" src="/ic-add.svg"></Image>
               }
                className="h-[40px] btn-create flex flex-row  items-center bg-sky-500"
              >
                Invite participants
              </Button>
            </Dropdown>
            <Button
              icon={<Image height={25} width={25} alt="" src="/ic-menu.svg"></Image>}
              className="border-none rounded-full btn-create flex items-center"
              style={{ width: "40px" }}
            />
          </div>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-[#fff] via-[#000] to-[#fff] mt-[20px]"></div>
        <IncludedTest game={dataDetail?.games} />
        <div className="rounded-2xl border flex justify-center items-center my-8 py-8">
          <Image height={400} width={400} alt="" src="/nodata.svg"/>
        </div>
        {isOpenInvite && (
          <InviteParticipantsModal
            token={dataDetail?.token}
            open={isOpenInvite}
            onClose={() => setIsOpenInvite(false)}
          />
        )}
      </div>
    </div>
  );
}
