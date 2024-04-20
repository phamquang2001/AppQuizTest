import Image from "next/image";
import React from "react";
interface Props {
  image: string;
  name?: string;
  time?: number;
  point?: number;
  status?: string;
}
function ItemTest(props: Props) {
  const { image, name, time, point, status } = props;
  return (
    <div className="rounded-2xl border w-[192px] p-3 flex flex-col gap-2">
      <Image height={160} width={166} src={image} alt="" />
      <h1 className="font-semibold text-base">{name}</h1>
      <div className="flex justify-between">
        <div className="flex gap-1">
          <Image width={16} height={16} src="/ic-time.svg" alt="" />
          <span>{time}s</span>
        </div>
        <div className="flex gap-1">
          <Image width={16} height={16} src="/ic-point.svg" alt="" />
          <span>{point}s</span>
        </div>
      </div>
      <div className="rounded-[32px] px-3 py-1 bg-[#A9F5AB] w-fit">
        <span>{status}</span>
      </div>
    </div>
  );
}

export default ItemTest;
