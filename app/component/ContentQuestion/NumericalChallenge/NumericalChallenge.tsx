import React from "react";
interface Props {
  expression: string;
}
function NumericalChallenge(props: Props) {
  const {  expression } = props;
  return (
    <div>
      <p className="text-[16px] leading-[24px] font-[500] text-[#111315] text-center my-[15px]">
        Choose the number that is closer to the right answer.
      </p>
      <div className="mt-[30px] relative">
        <div className=" bg-gradient-to-r from-[#009DBE] to-[#CBEBF1] w-full p-1 max-w-[800px] mx-auto h-[100px] rounded-[32px]">
          <input
            type="text"
            value={expression}
            className="text-[#111315] h-full w-full mx-auto bg-gradient-to-t from-[#CCEBF2] to-[#F4FDFF] rounded-[32px] outline-none p-4 text-center text-[40px] font-[700] focus:text-[#111315]"
          />
        </div>
      </div>
    </div>
  );
}
export default NumericalChallenge;
