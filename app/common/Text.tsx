import React from "react";
interface Props {
  text: string;
  weight?: number;
  className?: string;
}

function Text(props: Props) {
  const textStyle: React.CSSProperties = {
    fontWeight: props.weight || 400, // Sử dụng weight truyền vào hoặc mặc định là 400 nếu không có
  };
  return (
    <span className={props.className} style={textStyle}>
      {props.text}
    </span>
  );
}

export default Text;
