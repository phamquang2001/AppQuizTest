import React, { useEffect, useState } from "react";
import { Select } from "antd";

const { Option } = Select;
interface Props {
  setListEmail: (item: string[]) => void;
}
const InputMultipleEmail = (props: Props) => {
  const { setListEmail } = props;
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (value: string[]) => {
    const validEmails = value.filter(isValidEmail);
    setSelectedValues(validEmails);
    setListEmail(validEmails)
  };
  return (
    <Select
      mode="tags"
      style={{ width: "100%", padding: "4px 0" }}
      onChange={handleChange}
      tokenSeparators={[","]}
      open={false}
      suffixIcon={null}
      value={selectedValues}
      placeholder="Enter email, separated by comma"
      className="w-full p-2  overflow-y-auto max-h-[152px] scroll-y-auto border-solid border-[#DEDDDD] rounded-[8px]"
    ></Select>
  );
};

export default InputMultipleEmail;
