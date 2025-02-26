import { useContext } from "react";
import Options from "./Options";
import { QuizContext } from "../context/QuizContext";

function Question() {
  const { questions, index, dispatch, answer } = useContext(QuizContext);
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
