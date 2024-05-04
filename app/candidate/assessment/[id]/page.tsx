/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button, Spin } from "antd";
import useStore from "@/app/Zustand/CandidateStore";
interface Props {}
interface Game {
  id: number;
}
function page(props: Props) {
  const listGame = useStore((state) => state.dataListGame);
  const getListGameCandidate = useStore((state) => state.getListGameCandidate);

  const router = useRouter();
  const params = useParams();
  const filteredData = listGame.filter(
    (game: Game) => game.id === Number(params.id)
  );
  useEffect(() => {
    getListGameCandidate();
  }, []);
  const handleStart = () =>{
    router.push(`/candidate/assessment/${params.id}/playing`)
  }
  return (
    <div>
      <div className="py-10 px-20 flex items-center gap-3 font-semibold">
        <button onClick={() => router.back()}>
          <Image
            className=""
            alt=""
            width={30}
            height={30}
            src={"/ic-back.svg"}
          ></Image>
        </button>
        Back to assessment
      </div>
      {filteredData[0] ? (
        <div className="flex flex-col items-center justify-center  ">
          <Image
            className="border rounded-xl"
            height={300}
            width={300}
            src="/itemtest.svg"
            alt=""
          />
          <div className="w-[500px] flex flex-col items-center gap-3">
            <h1 className="font-semibold text-2xl leading-[56px]">
              {filteredData[0]?.name}
            </h1>
            <ul className="list-disc px-20">
              <li>
                <p className="text-sm">
                  32 questions are given in 150 seconds.
                </p>
              </li>
              <li>
                <p className="text-sm">
                  Decide if the two words have similar or opposite meaning.
                </p>
              </li>
              <li>
                <p className="text-sm">
                  {`Use the keyboard’s Left (<) or Right (>) arrow to answer the question and the Up (^) arrow to skip the question. `}
                </p>
              </li>
            </ul>

            <Button
              className="w-[430px] bg-[#009DBE] py-2 flex items-center justify-center h-10"
              type="primary"
              onClick={() => handleStart()}
            >
              Start
            </Button>
          </div>
        </div>
      ) : (
        <div className="size-20 focus:outline-none focus:border-blue-500 w-full flex justify-center	items-center">
          <Spin style={{ fontSize: 24, color: "white" }} size="large" />
        </div>
      )}
    </div>
  );
}

export default page;
