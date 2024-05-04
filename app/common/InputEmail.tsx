"use client";
import React, { useState } from "react";
import { Input } from "antd";

const { TextArea } = Input;
interface Props {
  className?: string;
  placeholder?: string;
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const InputEmail: React.FC<Props> = ({
  className,
  placeholder,
  id,
  value,
  onChange,
}) => {
  return (
    <>
      <TextArea
        onChange={(e) => onChange && onChange(e.target.value)}
        value={value}
        id={id}
        className={className}
        placeholder={placeholder}
        autoSize
      />
    </>
  );
};

export default InputEmail;
