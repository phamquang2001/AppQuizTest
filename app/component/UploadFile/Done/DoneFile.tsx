import Image from "next/image";
import React from "react";
interface Props {
  nameFile?: string;
  percent?: number;
  jsonData?: object[]
}
function DoneFile(props: Props) {
  const { nameFile, percent,jsonData } = props;
  return (
    <div className="flex flex-col items-center gap-3">
      <Image width={60} height={60} src="/success.svg" alt=""></Image>
      <p className="text-base font-medium leading-5">{nameFile}</p>
      <p className="text-[#009DBE] text-base font-medium leading-5">Upload list participants successfully!</p>
    </div>
  );
}

export default DoneFile;
