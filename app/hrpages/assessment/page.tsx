"use client";
import Logo from "@/app/common/Logo/Logo";
import React, { useState } from "react";
import "./style.scss";
import Image from "next/image";
import AssessContent from "@/app/component/AssessContent/AssessContent";
import Text from "@/app/common/Text/Text";
import HeaderHr from "@/app/component/HeaderHr/HeaderHr";
interface Props {}

function MyAssessment(props: Props) {
  return (
    <div>
      <HeaderHr></HeaderHr>
      <AssessContent></AssessContent>
    </div>
  );
}

export default MyAssessment;
