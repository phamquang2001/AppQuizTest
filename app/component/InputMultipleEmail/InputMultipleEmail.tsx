import React, { useState } from 'react';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';


const InputMultipleEmail: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>(['a10', 'c12']);

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
    console.log(value)
    setSelectedValues(value);
  };

  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <Select
            mode="multiple"
            style={{ width: "100%", padding: "4px 0" }}
            onChange={handleChange}
            // tokenSeparators={[","]}
            open={false}
            suffixIcon={null}
            value={selectedValues}
            placeholder="Please enter email"
            // onDeselect={handleDeselect}
          />
    </Space>
  );
};

export default InputMultipleEmail;
