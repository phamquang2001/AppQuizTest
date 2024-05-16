/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { useEffect } from "react";
interface Props {
  question: any;
  stateQuest: number;
  handleSkip: () => void;
  handleAnswer: (value: string) => void;
}
function VerbalChallenge(props: Props) {
  const { question, stateQuest, handleSkip, handleAnswer } = props;
  const answer = {
    answer1: "Same",
    answer2: "Opposite",
  };
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "ArrowUp") {
        handleSkip();
      } else if (event.key === "ArrowLeft") {
        handleAnswer(answer.answer1);
      } else if (event.key === "ArrowRight") {
        handleAnswer(answer.answer2);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [answer]);

  return (
    <>
      <div className="content relative">
        <div>
          <div className="mt-[30px] relative flex flex-col gap-3">
            <div className="border-2  w-full p-1 max-w-[600px] mx-auto h-[70px] rounded-[32px]">
              <p className="flex items-center justify-center text-[#111315] h-full w-full mx-auto  rounded-[32px] outline-none p-5 text-center text-[20px] font-[600] focus:text-[#111315]">
                {question?.question?.content?.question?.word_1}
              </p>
              <div />
            </div>
            <div className=" border-2  w-full p-1 max-w-[600px] mx-auto h-[70px] rounded-[32px]">
              <p className="flex items-center justify-center text-[#111315] h-full w-full mx-auto  rounded-[32px] outline-none p-5 text-center text-[20px] font-[600] focus:text-[#111315]">
                {question?.question?.content?.question?.word_2}
              </p>
            </div>
          </div>
        </div>
        {stateQuest !== -1 && (
          <div className="absolute flex items-center justify-center z-10 w-full top-[0px] translate-y-[-50%]">
            {stateQuest === 1 && (
              <Image width={80} height={80} alt="" src={"/correct.svg"}></Image>
            )}
            {stateQuest === 0 && (
              <Image
                width={80}
                height={80}
                alt=""
                src={"/incorrect.svg"}
              ></Image>
            )}
          </div>
        )}
      </div>
      <div className="mt-[30px]">
        <div>
          <p className="uppercase text-[#111315] text-[16px] leading-[24px] font-[600] text-center">
            skip
          </p>
          <button
            className="mx-auto flex items-center justify-center cursor-pointer"
            onClick={handleSkip}
          >
            <Image
              height={50}
              width={50}
              src="/skip-question.svg"
              alt=""
              className="active:scale-[0.9] transition "
            />
          </button>
        </div>
        <div className="flex gap-[200px] justify-center mobile:justify-between mobile:gap-0	">
          <div className="flex items-center gap-[20px] mobile:flex-col mobile:w-[150px]">
            <p className="text-[#111315] text-[20px] leading-[44px] font-[600] whitespace-nowrap mobile:order-2">
              {answer.answer1}
            </p>
            <button onClick={() => handleAnswer(answer.answer1)}>
              <Image
                height={50}
                width={50}
                className="active:scale-[0.9] transition mobile:order-1"
                src="/back-question.svg"
                alt=""
              />
            </button>
          </div>
          <div className="flex items-center gap-[20px] mobile:flex-col mobile:w-[150px]">
            <button onClick={() => handleAnswer(answer.answer2)}>
              <Image
                height={50}
                width={50}
                className="active:scale-[0.9] transition "
                src="/next-question.svg"
                alt=""
              />
            </button>
            <p className="text-[#111315] text-[20px] leading-[44px] font-[600] whitespace-nowrap">
              {answer.answer2}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default VerbalChallenge;
