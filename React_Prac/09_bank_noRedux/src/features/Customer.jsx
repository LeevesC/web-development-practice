import { useContext } from "react";
import { UserContext } from "../contexts/userContext.jsx";

function Customer() {
  const { userState } = useContext(UserContext);
  return <h2>👋 Welcome, {userState.fullName}</h2>;
}

export default Customer;
