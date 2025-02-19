function Options({ question, dispatch, answer }) {
  const correctOpt = question.correctOption;
  const isClick = answer !== null;

  // index is correctOpt 'correct'
  // index in not correctOpt 'wrong'
  // index is isAns 'answer'

  function anwStyle(index) {
    if (!isClick) return "";
    return (
      (index === correctOpt ? "correct " : "wrong ") +
      (index === answer ? "answer" : "")
    );
  }

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={"btn btn-option " + anwStyle(index)}
          disabled={isClick}
          key={option}
          onClick={() => dispatch({ type: "newAnser", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
