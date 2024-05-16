import React, { useEffect, useState } from "react";
import { Select, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getListCandidate } from "@/app/api/apiHr";
import { useParams } from "next/navigation";
import Image from "next/image";
import Grade from "@/app/common/Grade";
import useStoreDetail from "@/app/Zustand/DetailAssessment";
import { sliceFirstSpace } from "@/app/utils/function";
interface DataType {
  key: React.Key;
  email: string;
  average: number;
  verbal: number;
  logical: number;
  numerical: number;
  visual: number;
  memory: number;
  personality: any;
  grading: number;
  note: any;
  hiring: any;
}
const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const TableDashBoard = () => {
  const [listCandidate, setListCandidate] = useState<any>();
  const id = useParams().id;
  const dataListGame = useStoreDetail((state)=> state.data)
  const columnsGame = dataListGame?.games ? dataListGame?.games?.map((e: any) => {
    const newName = sliceFirstSpace(e?.name);
    return {
      title: newName,
      dataIndex: newName,
      sorter: (a: any, b: any) => a[newName] - b[newName],
      align: "center",
      render: (verbal: number) => <span>{verbal}%</span>,
    };
  }) : [];
  const columns: TableColumnsType<DataType> = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Average",
      dataIndex: "average",
      render: (average) => (
        <span className="rounded-lg bg-[#CCEBF2] py-2 px-3">{average}%</span>
      ),
      align: "center",
    }
    ,
    ...columnsGame
    ,
    {
      title: "Grading",
      dataIndex: "grading",
      sorter: (a, b) => a.grading - b.grading,
      align: "center",
      render: (grading) => <Grade rate={grading} />,
    },
    {
      title: "Note",
      dataIndex: "note",
      align: "center",
      render: () => (
        <Image
          className=" mx-auto"
          width={48}
          height={48}
          alt=""
          src={"/ic-note.svg"}
        ></Image>
      ),
    },
    {
      title: "Hiring stage",
      dataIndex: "hiring",
      render: () => (
        <Select
          defaultValue="Waiting"
          style={{ border: 0, width: "100px" }}
          bordered={false}
          className="ant-select-table"
          options={[
            {
              value: "waiting",
              label: "Waiting",
            },
            {
              value: "applied",
              label: "Applied",
            },
            {
              value: "refused",
              label: "Refused",
            },
          ]}
        />
      ),
      align: "center",
    },
  ]
  const { data: getDataCandidate, refetch } = useQuery({
    queryKey: ["listCandidate"],
    queryFn: () =>
      getListCandidate({ type: 1, option: 1, assessment_id: Number(id) }),
  });
  useEffect(() => {
    refetch();
    setListCandidate(getDataCandidate?.data.data.result);
  }, [getDataCandidate?.data.data.result, id, refetch]);

  const data: DataType[] = listCandidate?.map((item: any, index: number) => ({
    key: index,
    email: item.email,
    average:
      ((item?.rank_verbal_game +
        item?.rank_logical_game +
        item?.rank_numerical_game +
        item?.rank_visual_game +
        item?.rank_memory_game) /
        dataListGame?.games?.length).toFixed(2) ,
    Verbal: item?.rank_verbal_game,
    Logical: item?.rank_logical_game,
    Numerical: item?.rank_numerical_game,
    Visual: item?.rank_visual_game,
    Memory: item?.rank_memory_game,
    Personality: "",
    grading: 1,
    note: "Good candidate",
    hiring: "",
  }));
  return (
    <>
      {listCandidate?.length > 0 ? (
        <Table
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10"],
          }}
          className="mt-8"
          columns={columns}
          dataSource={data}
          onChange={onChange}
          bordered={false}
        />
      ) : (
        <div className="rounded-2xl border flex justify-center items-center my-8 py-8">
          <Image height={400} width={400} alt="" src="/nodata.svg" />
        </div>
      )}
    </>
  );
};

export default TableDashBoard;
