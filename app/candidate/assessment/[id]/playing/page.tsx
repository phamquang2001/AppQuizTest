"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useStore from "@/app/Zustand/CandidateStore";
import useStoreQuest from "@/app/Zustand/QuestionStore";
interface Game {
  id: number;
}
export default function TestNumericalChallenge() {
  const listGame = useStore((state) => state.dataListGame);
  const getListGameCandidate = useStore((state) => state.getListGameCandidate);
  const generateQuestion = useStoreQuest((state) => state.generateQuestion);
  const answerQuestion = useStoreQuest((state) => state.answerQuestion);
  const dataQuestion = useStoreQuest((state) => state.dataQuestion);
  const stateQuestion = useStoreQuest((state) => state.stateQuestion);
  const time_end = useStoreQuest((state) => state.time_end);
  const game_ended = useStoreQuest((state) => state.game_ended);
  const [showCountDown, setShowCountDown] = useState(false);
  const [stateQuest, setStateQuestion] = useState(-1);
  const [isSkip, setSkip] = useState(0);
  const router = useRouter();
  const id = useParams().id;

  const filteredData = listGame.filter((game: Game) => game.id === Number(id));
  useEffect(() => {
    getListGameCandidate();
    generateQuestion(Number(id));
    if(game_ended === false){
      setShowCountDown(true)
    }
    setTimeout(() => {
      setShowCountDown(false);
    }, 2000);
  }, []);
  const handleSkip = () => {
    setSkip(1);
  };
  const handleAnswer = async (value: any) => {
    const res = await answerQuestion(
      dataQuestion?.question?.id,
      value,
      Number(id),
      isSkip
    );
    if (stateQuestion === 1) {
      setStateQuestion(1);
      setTimeout(() => {
        setStateQuestion(-1);
      }, 1000);
    } else if (stateQuestion === 0) {
      setStateQuestion(0);
      setTimeout(() => {
        setStateQuestion(-1);
      }, 1000);
    }
    await generateQuestion(Number(id));
  };

  console.log(game_ended);
  console.log(time_end);
  console.log(filteredData)
  console.log(showCountDown)
  return (
    <>
      {showCountDown && !game_ended && (
        <div className="flex items-center justify-center h-[700px]">
          <Image
            width={200}
            height={200}
            alt=""
            src={"/Ảnh Countdown 3 2 1.gif"}
            unoptimized
          ></Image>
        </div>
      )}
      {!showCountDown && !game_ended && (
        <div className="relative p-8">
          <div className="absolute top-0 z-[-1] left-0">
            <Image src="/Game Background.png" alt="" width={800} height={500} />
          </div>
          <div className="absolute top-0 z-[-1] right-0">
            <Image
              src="/Game Background 2.png"
              alt=""
              width={800}
              height={500}
            />
          </div>
          <Image
            src="/ic-close.svg"
            width={40}
            height={50}
            alt=""
            className="h-[40px] w-[40px] active:scale-[0.85] transition-all"
            onClick={() => router.back()}
          />
          <div className="font-medium bg-white px-12 py-6 border-[1px] border-[#009DBE] rounded-[16px] w-full max-w-[1000px] mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex gap-[10px]">
                <div className="w-[12px] rounded-[40px] bg-[#009DBE]"></div>
                <h4 className="text-[#111315] text-[24px] font-[600] leading-[24px]">
                  {filteredData[0]?.name}
                </h4>
              </div>
              <div className="flex items-center gap-[30px]">
                <div className="flex gap-[10px] items-center">
                  <Image
                    width={30}
                    height={30}
                    src="/ic.game-time.svg"
                    alt=""
                  />
                  <p className="text-[#111315] font-[600] text-[16px] leading-[24px]">
                    {time_end}
                  </p>
                </div>
                <div className="flex gap-[10px] items-center">
                  <Image
                    width={30}
                    height={30}
                    src="/ic.game-quest.svg"
                    alt=""
                  />
                  <p className="text-[#111315] font-[600] text-[16px] leading-[24px]">
                    {dataQuestion?.answered_question_num}/
                    {dataQuestion?.total_question}
                  </p>
                </div>
                <div className="flex gap-[10px] items-center">
                  <Image
                    width={30}
                    height={30}
                    src="/ic.game-point.svg"
                    alt=""
                  />
                  <p className="text-[#111315] font-[600] text-[16px] leading-[24px]">
                    {dataQuestion?.total_score}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-[20px] h-[1px] w-full bg-gradient-to-r from-[#ffff] via-[#99D8E5] to-[#ffff]"></div>
            <div className="mt-[30px]">
              <Image
                className=" mx-auto max-w-[500px]"
                src="/game-avt.svg"
                alt=""
                width={400}
                height={80}
              />
            </div>
            <p className="text-[16px] leading-[24px] font-[500] text-[#111315] text-center my-[15px]">
              Choose the number that is closer to the right answer.
            </p>
            <div className="mt-[30px] relative">
              <div className=" bg-gradient-to-r from-[#009DBE] to-[#CBEBF1] w-full p-1 max-w-[800px] mx-auto h-[100px] rounded-[32px]">
                <input
                  type="text"
                  value={dataQuestion?.question?.content?.question?.expression}
                  className="text-[#111315] h-full w-full mx-auto bg-gradient-to-t from-[#CCEBF2] to-[#F4FDFF] rounded-[32px] outline-none p-4 text-center text-[40px] font-[700] focus:text-[#111315]"
                />
              </div>
              {stateQuestion !== -1 && (
                <div className="absolute flex items-center justify-center z-10 w-full top-[50%] translate-y-[-50%]">
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
                    {dataQuestion?.question?.content?.question?.result_1}
                  </p>
                  <button
                    onClick={() =>
                      handleAnswer(
                        dataQuestion?.question?.content?.question?.result_1
                      )
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
                      handleAnswer(
                        dataQuestion?.question?.content?.question?.result_2
                      )
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
                    {dataQuestion?.question?.content?.question?.result_2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {game_ended && (
        <div className="relative p-8">
          <div className="absolute top-0 z-[-1] left-0">
            <Image src="/Game Background.png" alt="" width={800} height={500} />
          </div>
          <div className="absolute top-0 z-[-1] right-0">
            <Image
              src="/Game Background 2.png"
              alt=""
              width={800}
              height={500}
            />
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
              Your Score:  {filteredData[0]?.score}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
