import React from "react";
import CountDown from "./CountDown";
import Image from "next/image";
function LogoShoppe() {
  const duration = 60000;
  return (
    <div>
      <Image className="logoShoppe" src="/logoShoppe.png" alt="" width={550}
      height={550}></Image>
      <CountDown duration={duration} />
    </div>
  );
}

export default LogoShoppe;
