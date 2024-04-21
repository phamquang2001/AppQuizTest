import React, { useState } from "react";
import { Cascader, Form, Input } from "antd";

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}
interface Props {
  setJobFunction: (value: string) => void;
  setJobPosition: (value: string) => void;
}
const options: Option[] = [
  {
    value: "developer",
    label: "Developer",
    children: [
      {
        value: "developerJunior",
        label: "C-level executive",
      },
      {
        value: "developerSenior",
        label: "Director",
      },
      {
        value: "developerLead",
        label: "Manager",
      },
      {
        value: "developerManager",
        label: "Junior / Trainee",
      },
      {
        value: "developerManager",
        label: "Intern",
      },
    ],
  },
  {
    value: "quanlityControl",
    label: "Quanlity control",
    children: [
      {
        value: "quanlityControlJunior",
        label: "C-level executive",
      },
      {
        value: "quanlityControlSenior",
        label: "Director",
      },
      {
        value: "quanlityControlLead",
        label: "Manager",
      },
      {
        value: "quanlityControlManager",
        label: "Junior / Trainee",
      },
      {
        value: "quanlityControlManager",
        label: "Intern",
      },
    ],
  },
  {
    value: "accounting",
    label: "Accounting",
    children: [
      {
        value: "accountingJunior",
        label: "C-level executive",
      },
      {
        value: "accountingSenior",
        label: "Director",
      },
      {
        value: "accountingLead",
        label: "Intern",
      },
      {
        value: "accountingManager",
        label: "Manager",
      },
    ],
  },
  {
    value: "productOwner",
    label: "Product Owner",
    children: [
      {
        value: "productOwnerJunior",
        label: "C-level executive",
      },
      {
        value: "productOwnerSenior",
        label: "Director",
      },
      {
        value: "productOwnerLead",
        label: "Intern",
      },
      {
        value: "productOwnerManager",
        label: "Manager",
      },
    ],
  },
  {
    value: "talentAcquisition",
    label: "Talent Acquisition",
    children: [
      {
        value: "talentAcquisitionJunior",
        label: "C-level executive",
      },
      {
        value: "talentAcquisitionSenior",
        label: "Director",
      },
      {
        value: "talentAcquisitionLead",
        label: "Intern",
      },
      {
        value: "talentAcquisitionManager",
        label: "Manager",
      },
    ],
  },
  {
    value: "other",
    label: "Other",
  },
];

const SelectRecruiting = (props: Props) => {
  const { setJobFunction, setJobPosition } = props;
  const [otherCheck, setOtherCheck] = useState<boolean>(false);

  const onChange = (value: (string | number)[]) => {
    if (value.length === 1) {
      setOtherCheck(true);
    } else {
      setOtherCheck(false);
    }
  };

  const displayRender = (labels: string[]) => {
    setJobFunction(labels[0]);
    setJobPosition(labels[1])
    return (
      <span>
        {labels.map((item, index) => {
          return (
            <>
              <span key={index}>{item}</span>
              <span>{index === labels.length - 1 ? "" : " - "}</span>
            </>
          );
        })}
      </span>
    );
  };
  return (
    <>
      <Form.Item
        className=" h-auto"
        label="Position recruiting"
        name="positionRecruiting"
        rules={[{ required: true, message: "Please select positions!" }]}
      >
        <Cascader
          className="h-auto"
          placeholder="please select positions"
          options={options}
          expandTrigger="click"
          displayRender={displayRender}
          onChange={onChange}
        />
      </Form.Item>
      {otherCheck && (
        <Form.Item
          label="Specify “Other” position"
          className="mt-4"
          name="otherPosition"
          rules={[{ required: false }]}
        >
          <Input placeholder="Please input other position" className="w-full" />
        </Form.Item>
      )}
    </>
  );
};

export default SelectRecruiting;
