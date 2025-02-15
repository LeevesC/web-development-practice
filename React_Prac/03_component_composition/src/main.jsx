import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import StarRating from "./StarRating";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <StarRating maxRating={10} />
  </StrictMode>
);
