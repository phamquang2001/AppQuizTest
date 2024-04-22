"use client";
import ItemAssessment from "@/app/common/ItemAssessment/ItemAssessment";
import Text from "@/app/common/Text/Text";
import { FolderAddFilled } from "@ant-design/icons";
import { Button, Modal, Spin } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import FormCreateAssessment from "../FormCreateAssessment/FormCreateAssessment";
import useStore from "@/app/Zustand/AssessmentStore";

interface Props {}
function AssessContent(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = useStore((state) => state.data);
  const dataArchive = useStore((state) => state.dataArchive);
  const getData = useStore((state) => state.listAssessment);
  const getDataArchive = useStore((state) => state.listAssessmentArchive);
  const [name,setName] = useState()

  useEffect(() => {
    getData();
    setName(data)
  }, []);

  useEffect(() => {
    getDataArchive();
  }, []);

  const dataAssessment = data?.map((item: any) => {
    const parseDateFromString = (dateString: string) => {
      const [day, month, year] = dateString.split("/");
      const [hours, minutes, seconds] = dateString.split(" ")[1].split(":");
      return new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes),
        parseInt(seconds)
      );
    };
    const startDate = parseDateFromString(item.start_date);
    const endDate = parseDateFromString(item.end_date);
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return {
      id: item.id,
      content: {
        name: item.name,
        participants: 8,
        date: differenceInDays,
      },
    };
  });
  const dataAssessmentArchive = dataArchive?.map((item: any) => {
    const parseDateFromString = (dateString: string) => {
      const [day, month, year] = dateString.split("/");
      const [hours, minutes, seconds] = dateString.split(" ")[1].split(":");
      return new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes),
        parseInt(seconds)
      );
    };
    const startDate = parseDateFromString(item.start_date);
    const endDate = parseDateFromString(item.end_date);
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return {
      id: item.id,
      content: {
        name: item.name,
        participants: 8,
        date: differenceInDays,
      },
    };
  });
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
        <div className="flex flex-wrap gap-10">
          {dataAssessment ? (
            dataAssessment
              ?.slice(0, 9)
              .map((item: any) => <ItemAssessment key={item.id} data={item} />)
          ) : (
            <div className="size-20 focus:outline-none focus:border-blue-500 w-full flex justify-center	items-center">
              <Spin style={{ fontSize: 24, color: "white" }} size="large" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col mt-7 gap-5">
        <Text
          className="text-3xl"
          text="Archived assessments"
          weight={600}
        ></Text>
        <div className="flex flex-wrap  gap-10">
          {dataAssessmentArchive ? (
            dataAssessmentArchive
              ?.slice(0, 9)
              .map((item: any) => (
                <ItemAssessment archive={true} key={item.id} data={item} />
              ))
          ) : (
            <div className="size-20 focus:outline-none focus:border-blue-500 w-full flex justify-center	items-center">
              <Spin style={{ fontSize: 24, color: "white" }} size="large" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssessContent;
