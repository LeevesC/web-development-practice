function Progress({ index, numQues, totalPoints, sumPoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQues} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQues}
      </p>
      <p>
        <strong>{sumPoints}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
