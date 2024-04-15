import React, { useMemo, useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import SelectTest from "../SelectTest/SelectTest";
import SelectRecruiting from "../RecruitingForm/SelectRecruiting";
const { RangePicker } = DatePicker;

interface Props {
  handleCancel?: () => void;
}

const FormCreateAssessment: React.FC<Props> = (props) => {
  const [arrow, setArrow] = useState("Show");

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  return (
    <Form
      onFinish={props.handleCancel}
      layout="vertical"
      variant="filled"
      style={{ maxWidth: 500 }}
    >
      <Form.Item
        label="Your assessment name"
        name="YourAssessmentName"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Input style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Select tests"
        name="SelectTests"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <SelectTest></SelectTest>
      </Form.Item>
        <SelectRecruiting></SelectRecruiting>
      <Form.Item
        label="Assessment date"
        name="AssessmentDate"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <RangePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 50 }}>
        <Button
          className="!w-full bg-sky-500 text-white text-base leading-6 font-medium py-5 flex items-center justify-center"
          type="default"
          htmlType="submit"
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormCreateAssessment;
