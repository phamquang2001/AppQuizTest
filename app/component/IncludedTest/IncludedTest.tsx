import React from "react";

interface Props {
  game: []
}
export default function IncludedTest( props: Props) {
  const {game} = props
  return (
    <div className="mt-[20px]">
      <h2 className="text-[20px] leading-[28px] font-[500] text-[#111315]">
        IncludedTest
      </h2>
      <div className="grid grid-cols-6 mt-[20px] grid-wrap gap-[10px]">
        {game?.map((item: any, index: any) => (
          <div
            key={index}
            className="cursor-pointer col-span-1 p-4 min-h-[84px] border-[1px] border-solid border-[#DEDDDD] rounded-[8px] text-[#111315] text-[16px] leading-[24px] font-[400]"
          >
            <p>{item.name}</p>
            <p className="mt-[10px]">{item.time}s</p>
          </div>
        ))}
      </div>
    </div>
  );
}
