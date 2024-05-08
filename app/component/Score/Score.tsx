import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  score: number;
}
function Score(props: Props) {
  const { score } = props;
  const router = useRouter();
  return (
    <div className="relative p-8">
      <div className="absolute top-0 z-[-1] left-0">
        <Image src="/Game Background.png" alt="" width={800} height={500} />
      </div>
      <div className="absolute top-0 z-[-1] right-0">
        <Image src="/Game Background 2.png" alt="" width={800} height={500} />
      </div>
      <Image
        src="/ic-close.svg"
        width={40}
        height={50}
        alt=""
        className="h-[40px] w-[40px] active:scale-[0.85] transition-all"
        onClick={() => router.back()}
      />
      <div className="font-medium bg-white px-12 py-6 border-[1px] border-[#009DBE] rounded-[16px] w-[700px]  mx-auto h-[500px] flex items-center justify-center ">
        <div className="mt-[30px] font-bold text-3xl text-blue-500">
          Your Score: {score}
        </div>
      </div>
    </div>
  );
}

export default Score;
