"use client";
import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputMultipleEmail from "../InputMultipleEmail/InputMultipleEmail";
// import UploadFIleModal from "./UploadFIleModal";

export default function InviteParticipantsModal({ open, onClose }: any) {
  const [value, setValue] = useState("");
  const [renderEmails, setRenderEmails] = useState<string[]>([]);
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const handleEnterEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      setRenderEmails((prevRenderEmails) => [value, ...prevRenderEmails]);
      setValue("");
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setRenderEmails(renderEmails.filter((email) => email !== emailToRemove));
  };

  return (
    <>
      {isOpenUpload ? (
        <></>
      ) : (
        // <UploadFIleModal
        //   onOpen={isOpenUpload}
        //   onClose={() => setIsOpenUpload(false)}
        // />
        <Modal
          title="Invite participants"
          open={open}
          onOk={onClose}
          onCancel={onClose}
          style={{}}
          width="800px"
          footer={false}
          centered
        >
          <div className="flex justify-between gap-[10px] mt-[20px]">
            <div className="w-full p-2 overflow-y-auto flex flex-wrap gap-[10px] max-h-[152px] border-[1px] scroll-y-auto border-solid border-[#DEDDDD] rounded-[8px]">
              {/* {renderEmails.map((item: any) => (
                <div
                  key={""}
                  className="rounded-[16px] flex gap-[5px] items-center px-[12px] py-[4px] bg-[#F4F4F4]"
                >
                  {item}
                </div>
              ))}
              <input
                placeholder="Enter email, seperated by comma"
                value={value}
                className="px-[10px] outline-none flex-1 block"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.value)
                }
                onKeyDown={handleEnterEmail}
                type="text"
              /> */}
              <InputMultipleEmail></InputMultipleEmail>
            </div>
            <Button
              className="h-[56px] w-full max-w-[140px] bg-sky-500"
              type="primary"
            >
              Send invite
            </Button>
          </div>

          <div className="mt-[50px]">
            <h3 className="text-[16px] leading-[24px] font-[500] text-[#111315]">
              Share your assessment link
            </h3>
            <div className="flex justify-between gap-[20px] mt-[10px]">
              <Input
                type="text"
                disabled
                placeholder="Enter email, seperated by comma"
                className="h-[56px] text-[#6F767E] text-[16px] font-[400] leading-[24px]"
                value={window.location.href}
                suffix={
                  <button
                    onClick={() => toast.success('Link copied successfully!')}
                    className="text-[#009DBE] flex items-center gap-[10px]"
                  >
                    <p className="text-[16px] font-[500] leading-[24px]">
                      Copy link
                    </p>
                    <img src="/icon-copy.svg" alt="" />
                  </button>
                }
              />
            </div>
            <p className="mt-[10px] text-[12px] leading-[16px] font-[400] text-[#6F767E] ml-[20px]">
              Only invited participants could assess the test
            </p>
          </div>
          <div className="mt-[40px] flex items-center gap-[20px]">
            <p className="text-[16px] leading-[24px] font-[500] text-[#6F767E]">
              You can also import excel file for bulk list of email
            </p>

            <Button
              onClick={() => setIsOpenUpload(true)}
              type="default"
              className="flex items-center border-[#66C4D8] text-[#009DBE] text-[16px] leading-[24px] font-[500]"
            >
              Upload here
            </Button>
            <ToastContainer />
          </div>
        </Modal>
      )}
    </>
  );
}
