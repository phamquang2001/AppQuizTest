"use client";
import ItemAssessment from "@/app/common/ItemAssessment/ItemAssessment";
import Text from "@/app/common/Text/Text";
import { FolderAddFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import FormCreateAssessment from "../FormCreateAssessment/FormCreateAssessment";

interface Props {}
function AssessContent(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col gap-10 my-7 ml-32">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <Text
            className="text-3xl"
            text="Active Assessment"
            weight={600}
          ></Text>
          <button
            onClick={showModal}
            className="flex flex-row gap-3 items-center mr-14 border rounded-lg p-2 text-white bg-sky-500"
          >
            <FolderAddFilled className="text-white text-xl" />
            Create new assessment
          </button>
          <Modal
            title="Create new assessment"
            open={isModalOpen}
            footer={null}
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}
          >
            <FormCreateAssessment
              handleCancel={handleCancel}
            ></FormCreateAssessment>
          </Modal>
        </div>
        <div className="flex flex-row gap-10">
          <ItemAssessment></ItemAssessment>
          <ItemAssessment></ItemAssessment>
        </div>
      </div>
      <div className="flex flex-col mt-7 gap-5">
        <Text
          className="text-3xl"
          text="Archived assessments"
          weight={600}
        ></Text>
        <div className="flex flex-row gap-10">
          <ItemAssessment archive={true}></ItemAssessment>
          <ItemAssessment archive={true}></ItemAssessment>
        </div>
      </div>
    </div>
  );
}

export default AssessContent;
