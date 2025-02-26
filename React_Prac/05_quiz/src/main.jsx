import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { QuizProvider } from "./context/QuizContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
    {/* <StarRating maxRating={10} /> */}
  </StrictMode>
);
