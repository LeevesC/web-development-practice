import { useEffect, useReducer } from "react";
import Header from "./Header";
import Section from "./Section";
import Loader from "./Loader";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    default:
      throw new Error("Action unknows");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchData() {
      const res = await fetch("http://localhost:8000/questions");
      const data = await res.json();
      // console.log(data);
      dispatch({ type: "dataReceived", payload: data });
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Section>
        <p>1/15</p>
        {state.status === "loading" ? (
          <Loader />
        ) : (
          <p>{state.questions[0].id}</p>
        )}
      </Section>
    </div>
  );
}
