import { useEffect, useReducer } from "react";
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
// import TimerTest from "./TimerTest";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  sumPoints: 0,
  secondRemain: 11,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFaild":
      return { ...state, status: "error" };
    case "active":
      return {
        ...state,
        status: "active",
        index: 0,
        sumPoints: 0,
        answer: null,
        secondRemain: 11,
      };
    case "newAnser":
      const currQues = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        sumPoints:
          action.payload === currQues.correctOption
            ? state.sumPoints + currQues.points
            : state.sumPoints,
      };
    case "nextQues":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return { ...state, status: "finished" };
    case "tick":
      return {
        ...state,
        secondRemain: state.secondRemain - 1,
        status: state.secondRemain === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknows");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, sumPoints, secondRemain } = state;
  const numQues = questions.length;
  const totalPoints = questions.reduce((total, curr) => total + curr.points, 0);

  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        // console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFaild" });
        console.error(err.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      {/* <TimerTest /> */}
      <Section>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQues={numQues} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQues={numQues}
              totalPoints={totalPoints}
              sumPoints={sumPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <>
              <Timer dispatch={dispatch} secondRemain={secondRemain} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQues={numQues}
              />
            </>
          </>
        )}
        {status === "finished" && (
          <FinishScreen sumPoints={sumPoints} dispatch={dispatch} />
        )}
      </Section>
    </div>
  );
}
