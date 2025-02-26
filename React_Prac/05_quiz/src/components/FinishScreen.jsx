import { QuizContext } from "../context/QuizContext";
import { useContext } from "react";
function FinishScreen() {
  const { sumPoints, dispatch } = useContext(QuizContext);
  return (
    <div>
      <p className="result">You scored {sumPoints}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active" })}
      >
        Restart quiz
      </button>
    </div>
  );
}

export default FinishScreen;
