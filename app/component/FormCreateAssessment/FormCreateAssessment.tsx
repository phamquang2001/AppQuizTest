import React, { useMemo, useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import SelectTest from "../SelectTest/SelectTest";
import SelectRecruiting from "../RecruitingForm/SelectRecruiting";
import { CreateAssessment } from "@/app/api/apiHr";
import { DataCreateAssessment } from "@/app/utils/type";
import { toast } from "react-toastify";
import useStore from "@/app/Zustand/AssessmentStore";
const { RangePicker } = DatePicker;

interface Props {
  handleCancel: () => void;
}
const FormCreateAssessment = (props: Props) => {
  const { handleCancel } = props;
  const [name, setName] = useState("");
  const [jobFunction, setJobFunction] = useState("");
  const [gameId, setGameId] = useState<number[]>([]);
  const [option, setOption] = useState<string[]>([]);
  const [jobPosition, setJobPosition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [form] = Form.useForm();
  const getData = useStore((state) => state.listAssessment);
  const getDataArchive = useStore((state) => state.listAssessmentArchive);
  const params: DataCreateAssessment = {
    name: name,
    job_function: jobFunction,
    game: gameId.map((id) => ({
      game_id: [id],
      option: id === 6 ? option : [],
    })),
    job_position: jobPosition,
    start_date: startDate,
    end_date: endDate,
  };
  const handleCreateAssessment = async () => {
    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("job_function", params.job_function);
    params.game.forEach((items: any, index: number) => {
      formData.append(`game[${index}][game_id]`, items.game_id.toString());
      formData.append(`game[${index}][option]`, items.option);
    });
    formData.append("job_position", params.job_position);
    formData.append("start_date", params.start_date);
    formData.append("end_date", params.end_date);
    const res = await CreateAssessment(formData);
    toast.info(res.data.message);
  };
  const onSelectDate = (date: any) => {
    setStartDate(date[0]);
    setEndDate(date[1]);
  };
  const handleFinish = () => {
    handleCancel();
    form.resetFields();
    getData();
    getDataArchive();
  };
  console.log(gameId);
  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      variant="filled"
      style={{ maxWidth: 500 }}
    >
      <Form.Item
        label="Your assessment name"
        name="YourAssessmentName"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Input
          value="abc"
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        label="Select tests"
        name="SelectTests"
        // rules={[{ required: true, message: "Please input!" }]}
      >
        <SelectTest
          setGameId={(value: number[]) => {
            setGameId(value);
          }}
          setOption={(value: string[]) => {
            setOption(value);
          }}
        ></SelectTest>
      </Form.Item>
      <SelectRecruiting
        setJobFunction={(value: string) => {
          setJobFunction(value);
        }}
        setJobPosition={(value: string) => {
          setJobPosition(value);
        }}
      />
      <Form.Item
        label="Assessment date"
        name="AssessmentDate"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <RangePicker
          format="DD-MM-YYYY HH:mm:ss"
          onChange={(dates, dateStrings) => {
            onSelectDate(dateStrings);
          }}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 50 }}>
        <Button
          className="!w-full bg-sky-500 text-white text-base leading-6 font-medium py-5 flex items-center justify-center"
          type="default"
          htmlType="submit"
          onClick={() => handleCreateAssessment()}
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormCreateAssessment;
