import { useState, useEffect } from "react";
function TimerTest() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1); // Update state every second
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <h1>Time: {count}s</h1>;
}

export default TimerTest;
