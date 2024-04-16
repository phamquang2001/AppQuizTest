import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

interface Props {
  id?: any
}
function ButtonDetails(props: Props) {
  return (
    <Link href={`/hrpages/invite-assessment/${props.id}`}>
      <button className="text-sky-500 py-1 flex gap-3 items-center text-xl font-semibold">
        Details
        <ArrowRightOutlined />
      </button>
    </Link>
  );
}

export default ButtonDetails;
