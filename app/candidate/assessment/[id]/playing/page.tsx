/* eslint-disable react-hooks/exhaustive-deps */
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
import LogicalChallenge from "@/app/component/ContentQuestion/LogicalChallenge/LogicalChallenge";
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
          question={question}
          stateQuest={stateQuest}
          handleSkip={() => handleSkip()}
          handleAnswer={(value: string) => handleAnswer(value)}
        />
      ),
    },
    {
      key: 2,
      component: (
        <NumericalChallenge
          question={question}
          stateQuest={stateQuest}
          handleSkip={() => handleSkip()}
          handleAnswer={(value: string) => handleAnswer(value)}
        />
      ),
    },
    {
      key: 3,
      component: (
        <LogicalChallenge
          question={question}
          stateQuest={stateQuest}
          handleSkip={() => handleSkip()}
          handleAnswer={(value: string) => handleAnswer(value)}
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);
  useEffect(() => {
    setTimeout(() => {
      setShowCountDown(false);
      generateData.mutate(Number(id));
    }, 3000);
    setShowCountDown(true);
  }, []);

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
            {list.map((item) => {
              if (item.key === Number(id)) {
                return item.component;
              }
              return null;
            })}
          </div>
        </div>
      )}
      {(question?.game_ended || dataFinish?.success) && (
        <Score score={dataFinish?.data?.score} />
      )}
    </>
  );
}
