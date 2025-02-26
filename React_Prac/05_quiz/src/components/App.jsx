import { useContext } from "react";
import Header from "./Header";
import Section from "./Section";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import { QuizContext } from "../context/QuizContext";

export default function App() {
  const { status } = useContext(QuizContext);

  return (
    <div className="app">
      <Header />
      {/* <TimerTest /> */}
      <Section>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <>
              <Timer />
              <NextButton />
            </>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Section>
    </div>
  );
}
