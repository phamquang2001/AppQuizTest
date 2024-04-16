import { Modal, Progress } from "antd";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import UploadingFile from "../UploadFile/Uploading/UploadingFile";
import DoneFile from "../UploadFile/Done/DoneFile";
import ErrorFile from "../UploadFile/Error/ErrorFile";
import * as XLSX from "xlsx";

const { Dragger } = Upload;
interface Props {
  handleCancel?: () => void;
  handleOk?: () => void;
  isModalOpen?: boolean;
}

function UploadFileModal(props: Props) {
  const [nameFile, setNameFile] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);
  const [statusFile, setStatusFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [messageError, setMessageError] = useState("");
  const [jsonData, setJsonData] = useState<any[]>([]);
  const prop: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".xls,.xlsx",
    fileList: fileList,
    onChange(info) {
      const { status, percent, type } = info.file;
      if (status === "uploading") {
        console.log(percent)
        if (
          type !== "application/vnd.ms-excel" &&
          type !==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          console.log("error");
          setStatusFile("error");
          setMessageError(
            "Invalid file type. Please upload only .xls or .xlsx files."
          );
          return;
        }
        setStatusFile("uploading");
        setFileList([info.file]);
        setNameFile(info.file.name);
        setPercent(percent || 0);
      }
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        const file = info?.file?.originFileObj;
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const dataJson = XLSX.utils.sheet_to_json(worksheet);
          setJsonData(dataJson);
        };
        if (file) {
          reader.readAsArrayBuffer(file);
        }
        setStatusFile("done");
        setFileList([info.file]);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        setStatusFile("error");
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    showUploadList: false,
  };
  return (
    <Modal
      title="Import participants email list"
      open={props.isModalOpen}
      onOk={props.handleCancel}
      onCancel={props.handleCancel}
      footer={false}
      width={"800px"}
    >
      <Dragger {...prop}>
        <div className="my-10 bg-[#F0F9FB] flex flex-col items-center gap-2 ">
          {statusFile === "uploading" && (
            <UploadingFile nameFile={nameFile} percent={percent} />
          )}
          {statusFile === "done" && <DoneFile jsonData={jsonData} nameFile={nameFile} />}
          {statusFile === "error" && (
            <ErrorFile nameFile={nameFile} messageError={messageError} />
          )}
          {statusFile === "" && (
            <>
              <p className="ant-upload-text text-base">
                Drag and drop .xls or .xlsx file here or
              </p>
              <button className="bg-[#CCEBF2] rounded-lg px-[30px] py-[10px] text-[#009DBE] font-medium text-base mt-2">
                Select file
              </button>
            </>
          )}
        </div>
      </Dragger>
      <p className="text-base my-3">
        Your excel file upload must only contains collumn A for list of
        participants email, no header. Upload participants using your own file
        or{" "}
        <span className="text-[#009DBE] text-base">Download sample file.</span>
      </p>
      {statusFile === "done" && (
        <div className="w-full flex justify-center">
          <button className="bg-[#009DBE] rounded-lg text-white py-3 px-4 mt-3">
            View your assessment
          </button>
        </div>
      )}
    </Modal>
  );
}

export default UploadFileModal;
