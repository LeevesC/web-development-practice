import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Contexts
import { UserContextProvider } from "./contexts/userContext.jsx";
import { AccountContextProvider } from "./contexts/accountContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <AccountContextProvider>
        <App />
      </AccountContextProvider>
    </UserContextProvider>
  </StrictMode>
);
