"use client";
import React, { useMemo, useState } from "react";
import "./styles/ItemAssessment.scss";
import Text from "./Text";
import ButtonDetails from "./ButtonDetails";
import Image from "next/image";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import {
  archiveAssessment,
  deleteAssessment,
  unArchiveAssessment,
} from "@/app/api/apiHr";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  archive?: boolean;
  data: {
    id: number;
    content: {
      name: string;
      participants: number;
      date: number;
    };
  };
}

function ItemAssessment(props: Props) {
  const { archive, data } = props;
  const [hideEye, setHideEye] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const archiveMutation = useMutation({
    mutationFn: archiveAssessment,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["getDataUnArchive"] });
      await queryClient.invalidateQueries({ queryKey: ["getDataArchive"] });
      toast.success(data.data.message);
    },
    onError: (data: any) => {
      toast.error(data.data.message);
    },
  });
  const unArchiveMutation = useMutation({
    mutationFn: unArchiveAssessment,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["getDataUnArchive"] });
      await queryClient.invalidateQueries({ queryKey: ["getDataArchive"] });
      toast.success(data.data.message);
    },
    onError: (data: any) => {
      toast.error(data.data.message);
    },
  });
  const deleteArchiveMutation = useMutation({
    mutationFn: deleteAssessment,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["getDataUnArchive"] });
      await queryClient.invalidateQueries({ queryKey: ["getDataArchive"] });
      toast.success(data.data.message);
    },
    onError: (data: any) => {
      toast.error(data.data.message);
    },
  });
  const handleArchive = async () => {
    const formData = new FormData();
    formData.append("assessment_id", data?.id.toString());
    archiveMutation.mutate(formData);
  };
  const handleUnArchive = async () => {
    const formData = new FormData();
    formData.append("assessment_id", data?.id.toString());
    unArchiveMutation.mutate(formData);
  };
  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("assessment_id", data?.id.toString());
    deleteArchiveMutation.mutate(formData);
  };
  return (
    <div
      className={
        !archive
          ? "item-assessment w-72 h-72 rounded-2xl border pl-2 flex flex-col justify-end gap-2"
          : "item-assessment w-72 h-72 rounded-2xl border pl-2 flex flex-col justify-end gap-2 opacity-40"
      }
    >
      {!archive ? (
        <div className="menu-assessment active-menu-assessment flex flex-row gap-2 items-center">
          {!hideEye ? (
            <Tooltip placement="top" title={"Show"}>
              <button
                className="item-menu"
                onClick={() => setHideEye(!hideEye)}
              >
                <EyeOutlined style={{ fontSize: "25px" }} />
              </button>
            </Tooltip>
          ) : (
            <Tooltip placement="top" title={"Hide"}>
              <button
                className="item-menu"
                onClick={() => setHideEye(!hideEye)}
              >
                <EyeInvisibleOutlined style={{ fontSize: "25px" }} />
              </button>
            </Tooltip>
          )}

          <Tooltip placement="top" title={"Duplicate"}>
            <button className="item-menu">
              <Image width={25} height={25} src="/duplicate.svg" alt=""></Image>
            </button>
          </Tooltip>
          <Tooltip placement="top" title={"Archive assessment"}>
            <button onClick={handleArchive} className="item-menu">
              <Image width={25} height={25} src="/archived.svg" alt=""></Image>
            </button>
          </Tooltip>
          <Tooltip placement="top" title={"Delete assessment"}>
            <button onClick={() => setIsModalOpen(true)} className="item-menu">
              <DeleteOutlined style={{ fontSize: "25px" }} />
            </button>
          </Tooltip>
          <Modal
            title={<span style={{ fontSize: "24px" }}>Delete assessment</span>}
            open={isModalOpen}
            footer={null}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          >
            <p className="py-6 text-lg">
              Are you sure you wish to delete this assessment and its content?
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-slate-300 rounded-lg py-2 px-4 text-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-200 text-red-600 rounded-lg py-2 px-4 text-lg "
              >
                Delete
              </button>
            </div>
          </Modal>
        </div>
      ) : (
        <div className="menu-assessment active-menu-assessment flex flex-row gap-2 items-center">
          <Tooltip placement="top" title={"Unarchive assessment"}>
            <button onClick={handleUnArchive} className="item-menu">
              <Image width={25} height={25} src="/archived.svg" alt=""></Image>
            </button>
          </Tooltip>
        </div>
      )}
      <Text
        className="text-xl"
        text={data?.content?.name || "Loading..."}
        weight={600}
      ></Text>
      <div
        className="line border-b w-44 "
        style={{
          background:
            "linear-gradient(90deg, rgba(51, 177, 203, 0.5) 0%, rgba(51, 177, 203, 0) 93.75%)",
        }}
      ></div>
      <div>
        <p>
          Number of participants:{" "}
          <span className="font-semibold">{data?.content?.participants}</span>
        </p>
        <p>
          Last activity:{" "}
          <span className="font-semibold">{data?.content?.date} days ago</span>
        </p>
      </div>
      <ButtonDetails id={data?.id} />
    </div>
  );
}

export default ItemAssessment;
