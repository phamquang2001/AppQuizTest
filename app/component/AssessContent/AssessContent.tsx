"use client";
import ItemAssessment from "@/app/common/ItemAssessment";
import Text from "@/app/common/Text";
import { FolderAddFilled } from "@ant-design/icons";
import { Modal, Spin } from "antd";
import React, { useState } from "react";
import FormCreateAssessment from "../FormCreateAssessment/FormCreateAssessment";
import { differenceInDays, parse } from "date-fns";
import { useQuery} from "@tanstack/react-query";
import { getListAssessment } from "@/app/api/apiHr";
interface Props {}
function AssessContent(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getData = useQuery({
    queryKey: ["getDataUnArchive"],
    queryFn: () => getListAssessment(1),
  });
  const getDataArchive = useQuery({
    queryKey: ["getDataArchive"],
    queryFn: () => getListAssessment(0),
  });

  const dataAssessment = getData?.data?.data?.data?.assessments?.map((item: any) => {
    const diffInDays = Math.abs(
      differenceInDays(
        parse(item.start_date, "dd/MM/yyyy HH:mm:ss", new Date()),
        parse(item.end_date, "dd/MM/yyyy HH:mm:ss", new Date())
      )
    );
    return {
      id: item.id,
      content: {
        name: item.name,
        participants: 8,
        date: diffInDays,
      },
    };
  });
  const dataAssessmentArchive = getDataArchive?.data?.data?.data?.assessments?.map((item: any) => {
    const diffInDays = Math.abs(
      differenceInDays(
        parse(item.start_date, "dd/MM/yyyy HH:mm:ss", new Date()),
        parse(item.end_date, "dd/MM/yyyy HH:mm:ss", new Date())
      )
    );
    return {
      id: item.id,
      content: {
        name: item.name,
        participants: 8,
        date: diffInDays,
      },
    };
  });
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
            onClick={() => setIsModalOpen(true)}
            className="flex flex-row gap-3 items-center mr-14 border rounded-lg p-2 text-white bg-sky-500"
          >
            <FolderAddFilled className="text-white text-xl" />
            Create new assessment
          </button>
          <Modal
            title="Create new assessment"
            open={isModalOpen}
            footer={null}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            width={600}
          >
            <FormCreateAssessment
              handleCancel={() => setIsModalOpen(false)}
            ></FormCreateAssessment>
          </Modal>
        </div>
        <div className="flex flex-wrap gap-10">
          {dataAssessment?.length > 0 ? (
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
          {dataAssessmentArchive?.length > 0 ? (
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
