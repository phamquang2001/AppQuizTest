import { ArrowRightOutlined } from "@ant-design/icons";
import React from "react";

interface Props {}
function ButtonDetails(props: Props) {
  return (
    <button className="text-sky-500 py-1 flex gap-3 items-center text-xl font-semibold">
      Details 
      <ArrowRightOutlined />
    </button>
  );
}

export default ButtonDetails;
