import { Progress } from "antd";
import React, { useEffect, useState } from "react";

function CountDown(props: { duration: number }) {
  const { duration } = props;
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) =>
        prevTimeLeft > 0 ? prevTimeLeft - 100 : 0
      );
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  const percent = (timeLeft / duration) * 100;
  return <Progress percent={percent} showInfo={false} />;
}

export default CountDown;
