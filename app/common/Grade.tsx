import React from "react";
import { Rate } from "antd";

interface Props {
  rate: number;
}
const Grade = (props: Props) => {
  const { rate } = props;
  return <Rate style={{ color: "#6F767E" }} disabled defaultValue={rate} />;
};
export default Grade;
