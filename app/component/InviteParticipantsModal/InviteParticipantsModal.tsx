"use client";
import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputMultipleEmail from "../InputMultipleEmail/InputMultipleEmail";
import UploadFileModal from "../UploadFileModal/UploadFileModal";
import { inviteCandidate } from "@/app/api/api";
import { useParams } from "next/navigation";

export default function InviteParticipantsModal({ open, onClose, token }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = useParams().id;
  const currentUrl = window.location.href;
  const baseUrl = currentUrl.split("/hrpages/")[0];
  const newUrl = `${baseUrl}/candidate/welcome/${token}`;
  const [listEmail, setListEmail] = useState<string[]>([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const copyLink = (inviteUrl: string) => {
    navigator.clipboard
      .writeText(inviteUrl)
      .then(() => {
        toast.success("Link copied successfully!");
      })
      .catch(() => {
        toast.error("Failed to copy link.");
      });
  };

  const handleSendInvite = async () => {
    const res = await inviteCandidate({
      assessment_id: id,
      type: 1,
      list_email: listEmail
    });
    console.log(res)
  };
  console.log("listEmail",listEmail)
  return (
    <>
      {isModalOpen ? (
        <UploadFileModal
          isModalOpen={true}
          handleOk={handleOk}
          handleCancel={handleCancel}
        ></UploadFileModal>
      ) : (
        <Modal
          title="Invite participants"
          open={open}
          onOk={onClose}
          onCancel={onClose}
          width="800px"
          footer={false}
          centered
        >
          <div className="flex justify-between gap-[10px] mt-[20px]">
            <InputMultipleEmail
              setListEmail={(e: string[]) => setListEmail(e)}
            ></InputMultipleEmail>
            <Button
              className="m-1 h-full py-2 w-full max-w-[140px] bg-sky-500"
              type="primary"
              onClick={handleSendInvite}
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
                value={newUrl}
                suffix={
                  <button
                    onClick={() => copyLink(newUrl)}
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
              onClick={showModal}
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
