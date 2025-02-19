function NextButton({ dispatch, answer, index, numQues }) {
  if (answer === null) return null;
  const isLast = index === numQues - 1;
  // console.log(isLast);
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        isLast ? dispatch({ type: "finished" }) : dispatch({ type: "nextQues" })
      }
    >
      {isLast ? "Done" : "Next"}
    </button>
  );
}

export default NextButton;
