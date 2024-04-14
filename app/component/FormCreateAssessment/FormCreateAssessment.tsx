import React, { useMemo, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Menu,
  Select,
  TreeSelect,
} from "antd";
import { Option } from "antd/es/mentions";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Popover } from "antd";
import SelectTest from "../SelectTest/SelectTest";
import TreeSelect1 from "../SelectTest/TreeSelect1";
const { RangePicker } = DatePicker;

const optionsTest = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const listPosition = [
  {
    key: "1",
    label: "Front-end",
    children: [
      {
        key: "1-1",
        label: "Intern",
      },
      {
        key: "1-2",
        label: "Fresher",
      },
      {
        key: "1-3",
        label: "Junior",
      },
      {
        key: "1-4",
        label: "Middle",
      },
    ],
  },
  {
    key: "2",
    label: "Tester",
    children: [
      {
        key: "2-1",
        label: "Intern",
      },
      {
        key: "2-2",
        label: "Fresher",
      },
      {
        key: "2-3",
        label: "Junior",
      },
      {
        key: "2-4",
        label: "Middle",
      },
    ],
  },
];
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
        label="Hiring position"
        name="HiringPosition"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Select>
          {listPosition.map((option) => (
            <Option key={option.key} value={option.label}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
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
