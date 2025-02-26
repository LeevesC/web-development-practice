import { useContext, useEffect } from "react";
import { QuizContext } from "../context/QuizContext";

function Timer() {
  const { dispatch, secondRemain } = useContext(QuizContext);
  const mins = Math.floor(secondRemain / 60);
  const seconds = secondRemain % 60;

  useEffect(
    function secondCount() {
      const intervalId = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(intervalId);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
