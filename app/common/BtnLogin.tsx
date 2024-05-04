import React from "react";
import { Button, Flex } from "antd";

interface BtnLoginProps {
  type?: "primary" | "default" | "dashed" | "text" | "link"; // Định nghĩa kiểu cho prop type
  text: string;
  className?: string
  onClick?: () => void;
}

const BtnLogin: React.FC<BtnLoginProps> = ({ type, text, className , onClick}) => {
  return (
    <Flex gap="small" wrap="wrap">
      <Button onClick={onClick} className={className} type={type}>{text}</Button>
    </Flex>
  );
};

export default BtnLogin;
