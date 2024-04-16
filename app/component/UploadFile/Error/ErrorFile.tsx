import React from "react";
interface Props {
  nameFile?: string;
  percent?: number;
  messageError?: string;
}
function ErrorFile(props: Props) {
  const { nameFile, percent, messageError } = props;

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="ant-upload-text text-base">
        Drag and drop .xls or .xlsx file here or
      </p>
      <button className="bg-[#CCEBF2] rounded-lg px-[30px] py-[10px] text-[#009DBE] font-medium text-base mt-2">
        Select file
      </button>
      <p className="text-[#DD0F05] font-medium text-base">{messageError}</p>
    </div>
  );
}

export default ErrorFile;
