import { QuizContext } from "../context/QuizContext";
import { useContext } from "react";
function StartScreen() {
  const { numQues, dispatch } = useContext(QuizContext);
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQues} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
