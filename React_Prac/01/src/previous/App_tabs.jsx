import { useState } from "react";

const messages = ["Learn React", "Apply for jobs", "Invest your new income"];

export default function App() {
  const [step, setStep] = useState(0);

  function previous() {
    setStep((step) => (step - 1 < 0 ? 2 : step - 1));
  }
  function next() {
    setStep((step) => (step + 1 > 2 ? 0 : step + 1));
  }

  return (
    <div className="steps">
      <div className="numbers">
        <div className={step + 1 === 1 ? "active" : null}>1</div>
        <div className={step + 1 === 2 ? "active" : null}>2</div>
        <div className={step + 1 === 3 ? "active" : null}>3</div>
      </div>
      <p className="message">{messages[step]}</p>
      <div className="buttons">
        <button onClick={previous}>Previous</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}
