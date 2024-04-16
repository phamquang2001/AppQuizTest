import { Progress } from "antd";
import React from "react";
interface Props {
  nameFile?: string;
  percent?: number;
}

function UploadingFile(props: Props) {
  const { nameFile, percent } = props;
  return (
    <>
      <img width={60} height={60} src="/excel.svg" alt=""></img>
      <p className="text-base font-medium leading-5">{nameFile}</p>
      <Progress className="w-5/6" percent={percent} showInfo={false} />
    </>
  );
}

export default UploadingFile;
