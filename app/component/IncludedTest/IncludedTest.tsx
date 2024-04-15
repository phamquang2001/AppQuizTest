import React from "react";

const menu = [
  {
    contentName: "Verbal challenge",
    time: "90s",
  },
  {
    contentName: "Numerical challenge",
    time: "100s",
  },
  {
    contentName: "Logical challenge",
    time: "90s",
  },
  {
    contentName: "Visual challenge",
    time: "90s",
  },
  {
    contentName: "Memory challenge",
    time: "90s",
  },
  {
    contentName: "Personality Discovery",
    time: "90s",
  },
];

export default function IncludedTest() {
  return (
    <div className="mt-[20px]">
      <h2 className="text-[20px] leading-[28px] font-[500] text-[#111315]">
        IncludedTest
      </h2>
      <div className="grid grid-cols-6 mt-[20px] grid-wrap gap-[10px]">
        {menu.map((item: any, index: any) => (
          <div
            key={index}
            className="cursor-pointer col-span-1 p-4 min-h-[84px] border-[1px] border-solid border-[#DEDDDD] rounded-[8px] text-[#111315] text-[16px] leading-[24px] font-[400]"
          >
            <p>{item.contentName}</p>
            <p className="mt-[10px]">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
