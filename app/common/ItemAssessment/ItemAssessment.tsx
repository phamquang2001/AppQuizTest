"use client";
import React, { useMemo, useState } from "react";
import Text from "../Text/Text";
import "./style.scss";
import ButtonDetails from "../ButtonDetails/ButtonDetails";
import Image from "next/image";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

interface Props {
  archive?: boolean;
}

function ItemAssessment(props: Props) {
  const { archive } = props;
  const [hideEye, setHideEye] = useState(false);
  return (
    <div
      className={
        !archive
          ? "item-assessment w-72 h-72 rounded-2xl border pl-2 flex flex-col justify-end gap-2"
          : "item-assessment w-72 h-72 rounded-2xl border pl-2 flex flex-col justify-end gap-2 opacity-40"
      }
    >
      {!archive ? (
        <div className="menu-assessment active-menu-assessment flex flex-row gap-2 items-center">
          {!hideEye ? (
            <Tooltip placement="top" title={"Show"}>
              <button
                className="item-menu"
                onClick={() => setHideEye(!hideEye)}
              >
                <EyeOutlined style={{ fontSize: "25px" }} />
              </button>
            </Tooltip>
          ) : (
            <Tooltip placement="top" title={"Hide"}>
              <button
                className="item-menu"
                onClick={() => setHideEye(!hideEye)}
              >
                <EyeInvisibleOutlined style={{ fontSize: "25px" }} />
              </button>
            </Tooltip>
          )}

          <Tooltip placement="top" title={"Duplicate"}>
            <button className="item-menu">
              <Image width={25} height={25} src="/duplicate.svg" alt=""></Image>
            </button>
          </Tooltip>
          <Tooltip placement="top" title={"Archive assessment"}>
            <button className="item-menu">
              <Image width={25} height={25} src="/archived.svg" alt=""></Image>
            </button>
          </Tooltip>
        </div>
      ) : (
        ""
      )}
      <Text className="text-xl" text="Assessment name" weight={600}></Text>
      <div
        className="line border-b w-44 "
        style={{
          background:
            "linear-gradient(90deg, rgba(51, 177, 203, 0.5) 0%, rgba(51, 177, 203, 0) 93.75%)",
        }}
      ></div>
      <div>
        <p>
          Number of participants: <span className="font-semibold">8</span>
        </p>
        <p>
          Last activity: <span className="font-semibold">6 days ago</span>
        </p>
      </div>
      <ButtonDetails />
    </div>
  );
}

export default ItemAssessment;
