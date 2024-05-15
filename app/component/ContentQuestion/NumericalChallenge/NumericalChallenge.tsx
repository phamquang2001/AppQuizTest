"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
interface Props {
  question: any;
  stateQuest: number;
  handleSkip: () => void;
  handleAnswer: (value: string) => void;
}
function NumericalChallenge(props: Props) {
  const { question, stateQuest, handleSkip, handleAnswer } = props;
  const answer = {
    answer1: question?.question?.content?.question?.result_1,
    answer2: question?.question?.content?.question?.result_2,
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer.answer1, answer.answer2]);

  return (
    <>
        <div className="content relative">
          <div>
            <p className="text-[16px] leading-[24px] font-[500] text-[#111315] text-center my-[15px]">
              Choose the number that is closer to the right answer.
            </p>
            <div className="mt-[30px] relative">
              <div className=" bg-gradient-to-r from-[#009DBE] to-[#CBEBF1] w-full p-1 max-w-[800px] mx-auto h-[100px] rounded-[32px]">
                <input
                  type="text"
                  value={question?.question?.content?.question?.expression}
                  className="text-[#111315] h-full w-full mx-auto bg-gradient-to-t from-[#CCEBF2] to-[#F4FDFF] rounded-[32px] outline-none p-4 text-center text-[40px] font-[700] focus:text-[#111315]"
                />
              </div>
            </div>
          </div>
          {stateQuest !== -1 && (
            <div className="absolute flex items-center justify-center z-10 w-full top-[0px] translate-y-[-50%]">
              {stateQuest === 1 && (
                <Image
                  width={80}
                  height={80}
                  alt=""
                  src={"/correct.svg"}
                ></Image>
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
              onClick={() => handleSkip()}
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
          <div className="flex gap-[200px] justify-center">
            <div className="flex items-center gap-[20px]">
              <p className="text-[#111315] text-[20px] leading-[44px] font-[600] whitespace-nowrap">
                {answer.answer1}
              </p>
              <button
                onClick={() =>
                  handleAnswer(answer.answer1)
                }
              >
                <Image
                  height={50}
                  width={50}
                  className="active:scale-[0.9] transition "
                  src="/back-question.svg"
                  alt=""
                />
              </button>
            </div>
            <div className="flex items-center gap-[20px]">
              <button
                onClick={() =>
                  handleAnswer(answer.answer2)
                }
              >
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
export default NumericalChallenge;
