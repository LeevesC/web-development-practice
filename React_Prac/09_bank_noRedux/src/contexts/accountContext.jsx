import { createContext, useReducer } from "react";

const AccountContext = createContext();

function accountReducer(state, action) {
  switch (action.type) {
    case "deposit":
      return {
        ...state,
        balance: state.balance + Number(action.payload),
      };
    case "withdraw":
      return {
        ...state,
        balance: state.balance - Number(action.payload),
      };
    case "requestLoan":
      if (state.existedLoan) {
        alert("You already have a loan");
        return state;
      }
      return {
        ...state,
        balance: state.balance + Number(action.payload),
        existedLoan: action.payload,
      };
    case "payLoan":
      return {
        ...state,
        balance: state.balance - Number(state.existedLoan),
        existedLoan: "",
      };
    default:
      return state;
  }
}

function AccountContextProvider({ children }) {
  const [accountState, accountDispatch] = useReducer(accountReducer, {
    balance: 0,
    existedLoan: "",
  });
  return (
    <AccountContext.Provider
      value={{
        accountState,
        accountDispatch,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export { AccountContextProvider, AccountContext };
