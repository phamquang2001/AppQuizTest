import ItemTest from "@/app/common/ItemTest";
import Header from "@/app/component/Header/Header";
import React from "react";

interface Props {}
function CandidateAssessment(props: Props) {
  return (
    <div>
      <Header />
      <div className=" py-8 px-28 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-xl">Welcome to our assessment</h2>
          <p>
            These are not traditional assessment tests but fun & engaging
            gamified challenges for you to discover yourself and explore if you
            are the most SUITABLE for the applying position.
          </p>
          <p>Are you up for the challenge?</p>
          <ul className="flex flex-col gap-1 pl-8 list-disc">
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
          <p>Have fun and good luck.</p>
        </div>
        <div>
          <h1 className="font-semibold text-4xl">Choose a test</h1>
          <ItemTest
            image="/itemtest.svg"
            name="Verbal challenge"
            time={90}
            point={100}
          ></ItemTest>
        </div>
      </div>
    </div>
  );
}

export default CandidateAssessment;
