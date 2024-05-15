import { Progress } from "antd";
import Image from "next/image";
import React from "react";
interface Props {
  nameFile?: string;
  percent?: number;
}

function UploadingFile(props: Props) {
  const { nameFile, percent } = props;
  return (
    <>
      <Image width={60} height={60} src="/excel.svg" alt=""></Image>
      <p className="text-base font-medium leading-5">{nameFile}</p>
      <Progress className="w-5/6" percent={percent} showInfo={false} />
    </>
  );
}

export default UploadingFile;
