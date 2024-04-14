"use client";
import React, { useState } from "react";
import { Button, Input, Space } from "antd";

interface InputPasswordProps {
  className?: string;
  placeholder?: string
  id?: string
}

const InputPassword: React.FC<InputPasswordProps> = ({ className, placeholder, id }) => {

  return (
    <Space className="w-full" direction="vertical">
      <Input.Password id={id} className={className} placeholder={placeholder} />
    </Space>
  );
};

export default InputPassword;
