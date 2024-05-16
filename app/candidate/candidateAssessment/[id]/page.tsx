"use client";
import useStore from "@/app/Zustand/CandidateStore";
import ItemTest from "@/app/common/ItemTest";
import Header from "@/app/component/Header/Header";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {}
function CandidateAssessment(props: Props) {
  const getListGameCandidate = useStore((state) => state.getListGameCandidate);
  const dataListGame = useStore((state) => state.dataListGame);
  const router = useRouter();
  useEffect(() => {
    getListGameCandidate();
  }, [getListGameCandidate]);
  const handleOpen = (item: any) => {
    if (item?.status !== 2) {
      router.push(`/candidate/assessment/${item.id}`);
    }else{
      toast.success(item?.status_text)
    }
  };
  return (
    <div>
      <Header />
      <div className=" py-8 px-28 flex flex-col gap-6 mobile:py-3 mobile:px-3">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl">Welcome to our assessment</h2>
          <p className="mobile:text-sm">
            These are not traditional assessment tests but fun & engaging
            gamified challenges for you to discover yourself and explore if you
            are the most SUITABLE for the applying position.
          </p>
          <p className="mobile:text-sm">Are you up for the challenge?</p>
          <ul className="flex flex-col gap-1 pl-8 list-disc mobile:text-sm">
            <li>
              This assessment includes [6] tests, which will take approximately
              [20 minutes] to accomplish.
            </li>
            <li>Read all the instructions carefully in each challenge.</li>
            <li>You can turn the audio on to enter the gamified world.</li>
            <li>
              Make sure you are not distracted by any other factors, stay
              focused and relaxed.
            </li>
            <li>Do not refresh the page or close the window while playing.</li>
          </ul>
          <p className="mobile:text-sm">Have fun and good luck.</p>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-3xl mobile:text-base">Choose a test</h1>
          <div className="flex flex-wrap gap-6 mb-3">
            {dataListGame?.map((item: any) => (
              <button key={item.id} onClick={() => handleOpen(item)}>
                <ItemTest
                  image="/itemtest.svg"
                  name={item.name}
                  time={item.time - item.used_time}
                  point={item.score}
                  status={item.status_text}
                ></ItemTest>
              </button>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default CandidateAssessment;
