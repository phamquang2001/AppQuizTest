"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useStore from "@/app/Zustand/CandidateStore";
import { useMutation } from "@tanstack/react-query";
import {
  answerQuestion,
  finishGame,
  generateQuestion,
} from "@/app/api/apiCandidate";
import Score from "@/app/component/Score/Score";
import NumericalChallenge from "@/app/component/ContentQuestion/NumericalChallenge/NumericalChallenge";
import VerbalChallenge from "@/app/component/ContentQuestion/VerbalChallenge/VerbalChallenge";
interface Game {
  id: number;
}
export default function Challenge() {
  const listGame = useStore((state) => state.dataListGame);
  const [showCountDown, setShowCountDown] = useState(false);
  const [stateQuest, setStateQuestion] = useState(-1);
  const [time, setTime] = useState<number>(250);
  const router = useRouter();
  const id = useParams().id;
  const [question, setQuestion] = useState<any>();
  const filteredData = listGame.filter((game: Game) => game.id === Number(id));
  const [dataFinish, setDataFinish] = useState<any>();
  const list = [
    {
      key: 1,
      component: (
        <VerbalChallenge
          expression={question?.question?.content?.question?.expression}
        />
      ),
    },
    {
      key: 2,
      component: (
        <NumericalChallenge
          expression={question?.question?.content?.question?.expression}
        />
      ),
    },
  ];
  const generateData = useMutation({
    mutationFn: generateQuestion,
    onSuccess: async (data: any) => {
      await setTime(data.data.data.time - data.data.data.used_time);
      setQuestion(data.data.data);
      setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    },
  });
  const handleAnswerQuestion = useMutation({
    mutationFn: answerQuestion,
    onSuccess: async (data: any) => {
      if (data?.data.data.result === 1) {
        setStateQuestion(1);
        setTimeout(() => {
          setStateQuestion(-1);
          setQuestion(data.data.data);
        }, 1000);
      } else if (data?.data.data.result === 0) {
        setStateQuestion(0);
        setTimeout(() => {
          setStateQuestion(-1);
          setQuestion(data.data.data);
        }, 1000);
      } else {
        setQuestion(data.data.data);
      }
    },
  });
  const handleFinish = useMutation({
    mutationFn: finishGame,
    onSuccess: (data: any) => {
      setDataFinish(data?.data);
      setTimeout(() => {
        router.back();
        router.back();
      }, 5000);
    },
  });
  const handleSkip = () => {
    handleAnswerQuestion.mutate({
      id: question?.question?.id,
      answer: "",
      game_id: Number(id),
      is_skip: 1,
    });
  };
  const handleAnswer = async (value: any) => {
    handleAnswerQuestion.mutate({
      id: question?.question?.id,
      answer: value,
      game_id: Number(id),
      is_skip: 0,
    });
    if (question?.answered_question_num === 31) {
      handleFinish.mutate(Number(id));
    }
  };
  useEffect(() => {
    if (time === 0 || question?.game_ended) {
      handleFinish.mutate(Number(id));
    }
  }, [time]);
  useEffect(() => {
    setTimeout(() => {
      setShowCountDown(false);
      generateData.mutate(Number(id));
    }, 3000);
    setShowCountDown(true);
  }, []);
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "ArrowUp") {
        handleSkip();
      } else if (event.key === "ArrowLeft") {
        handleAnswer(question?.question?.content?.question?.result_1);
      } else if (event.key === "ArrowRight") {
        handleAnswer(question?.question?.content?.question?.result_2);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    question?.question?.content?.question?.result_1,
    question?.question?.content?.question?.result_2,
  ]);
  return (
    <>
      {showCountDown && !question?.game_ended && (
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
      {!showCountDown && !question?.game_ended && !dataFinish && (
        <div autoFocus className="relative p-8">
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
                    {time}
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
                    {question?.answered_question_num + 1}/
                    {question?.total_question}
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
                    {question?.total_score}
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
            <div className="content relative">
              {list.map((item) => {
                if ((item.key === Number(id))) {
                  return item.component;
                }
                return null;
              })}
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
                    {question?.question?.content?.question?.result_1}
                  </p>
                  <button
                    onClick={() =>
                      handleAnswer(
                        question?.question?.content?.question?.result_1
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
                        question?.question?.content?.question?.result_2
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
                    {question?.question?.content?.question?.result_2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {(question?.game_ended || dataFinish?.success) && (
        <Score score={dataFinish?.data?.score} />
      )}
    </>
  );
}
