import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const InputMultipleEmail: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const isValidEmail = (email: string): boolean => {
    // Kiểm tra định dạng email bằng regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (value: string[]) => {
    // Lọc ra các giá trị không phải là địa chỉ email hợp lệ
    const validEmails = value.filter(isValidEmail);
    setSelectedValues(validEmails);
  };

  return (
    <Select
      mode="tags"
      style={{ width: '100%', padding: '4px 0' }}
      onChange={handleChange}
      tokenSeparators={[',']}
      open={false}
      suffixIcon={null}
      value={selectedValues}
      placeholder="Enter email, separated by comma"
      className="w-full p-2  overflow-y-auto max-h-[152px] scroll-y-auto border-solid border-[#DEDDDD] rounded-[8px]"
    >
    </Select>
  );
};

export default InputMultipleEmail;
