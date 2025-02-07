import { useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("Hello World");
  const [num, setNum] = useState(0);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    console.log(data.slip.advice);
    setAdvice(data.slip.advice);
    setNum((num) => num + 1);
  }
  function reSet() {
    setNum(0);
    setAdvice("Hello World");
  }

  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>get advcie</button>
      <Message a={num} />
      <button onClick={reSet}>reset</button>
    </div>
  );
}

function Message(props) {
  console.log(props);
  return (
    <p>
      You have read <strong>{props.a}</strong> pieces of advice
    </p>
  );
}
