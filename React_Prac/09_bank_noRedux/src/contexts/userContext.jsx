import { createContext, useReducer } from "react";

function userReducer(state, action) {
  switch (action.type) {
    case "login":
      if (state.fullName === "" || state.nationalId === "") {
        alert("Please fill in all fields");
        return state;
      }
      return { ...state, isLoggedIn: true };
    case "updateFullName":
      return { ...state, fullName: action.payload };
    case "updateNationalId":
      return { ...state, nationalId: action.payload };
    default:
      return state;
  }
}

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [userState, userDispatch] = useReducer(userReducer, {
    isLoggedIn: false,
    fullName: "",
    nationalId: "",
  });

  return (
    <UserContext.Provider
      value={{
        userState,
        userDispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
