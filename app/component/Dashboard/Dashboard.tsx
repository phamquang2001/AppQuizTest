import { Button, Select } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import TableDashBoard from "../Table/Table";

interface DashBoardProps {
  listCandidate?: any;
}

export default function DashBoard({
  listCandidate,
}: DashBoardProps) {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="mt-[30px] w-full">
      <div className="border-[1px] border-solid border-[#DEDDDD] rounded-[16px] w-full py-[30px] px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[10px]">
            <button
              className={`text-[20px] font-[500] leading-[28px]  ${
                isActive
                  ? "text-[#009DBE] border-[#009DBE] border-b-[2px] transition-all"
                  : "text-[#111315] "
              }`}
              onClick={() => setIsActive(!isActive)}
            >
              Applicants
            </button>
            <button
              className={`text-[20px] font-[500] leading-[28px]  ${
                !isActive
                  ? "text-[#009DBE] border-[#009DBE] border-b-[2px] transition-all"
                  : "text-[#111315]"
              }`}
              onClick={() => setIsActive(!isActive)}
            >
              Employees
            </button>
          </div>
          <Button className="flex items-center justify-between gap-[10px] text-[#009DBE] rounded-[16px] border-[#66C4D8] leading-[24px] font-[500]">
            Export result
            <Image
              src="/ic-download.svg"
              alt="ic-export"
              width={24}
              height={24}
            />
          </Button>
        </div>
        <div className="mt-[30px] flex items-center gap-[10px]">
          <div className="px-[20px] border-[1px] border-solid border-[#DEDDDD] rounded-[16px] max-w-[370px] flex items-center">
            <p className="text-[#111315] leading-[24px] font-[700] text-[16px]">
              View by:
            </p>
            <Select
              defaultValue="Percentile rank with market data"
              style={{ border: 0, width: "250px" }}
              bordered={false}
              className="ant-select-table"
              options={[
                {
                  value: "email",
                  label: "Email",
                },
                {
                  value: "rank data",
                  label: "Percentile rank with market data",
                },
              ]}
            />
          </div>
          <div className="cursor-pointer">
            <Image
              alt="ic-question"
              src="/ic-question.svg"
              height={32}
              width={32}
            />
          </div>
          
        </div>
        <TableDashBoard/>
      </div>
      
    </div>
  );
}