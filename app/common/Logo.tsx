import Image from "next/image";
import React from "react";

function Logo(props: any) {
  return (
    <Image
      src="/logo.png"
      width={500}
      height={500}
      alt="Picture of the author"
      className="w-48 h-24 mt-2 ml-10 mobile:w-24 mobile:h-12"
    />
  );
}

export default Logo;
