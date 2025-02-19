function FinishScreen({ dispatch, sumPoints }) {
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
