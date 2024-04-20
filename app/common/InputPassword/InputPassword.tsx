"use client";
import React, { useState } from "react";
import { Button, Input, Space } from "antd";

interface InputPasswordProps {
  className?: string;
  placeholder?: string;
  id?: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const InputPassword: React.FC<InputPasswordProps> = ({
  className,
  placeholder,
  id,
  setPassword,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <Space className="w-full" direction="vertical">
      <Input.Password
        onChange={handleChange}
        id={id}
        className={className}
        placeholder={placeholder}
      />
    </Space>
  );
};

export default InputPassword;
