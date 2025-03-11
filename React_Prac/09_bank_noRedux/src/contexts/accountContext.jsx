import { createContext, useReducer } from "react";

const AccountContext = createContext();

function accountReducer(state, action) {
  switch (action.type) {
    case "setDepositAmount":
      return { ...state, depositAmount: action.payload };
    case "setCurrency":
      return { ...state, currency: action.payload };
    case "deposit":
      return {
        ...state,
        balance: state.balance + Number(action.payload),
        depositAmount: "",
        currency: "USD",
      };
    case "setWithdrawalAmount":
      return { ...state, withdrawalAmount: action.payload };
    case "withdraw":
      return {
        ...state,
        balance: state.balance - Number(action.payload),
        withdrawalAmount: "",
      };
    case "setLoanAmount":
      return { ...state, loanAmount: action.payload };
    case "setLoanPurpose":
      return { ...state, loanPurpose: action.payload };
    case "requestLoan":
      if (state.loanPurpose === "") {
        alert("Please enter a loan purpose");
        return state;
      }
      if (state.existedLoan) {
        alert("You already have a loan");
        return state;
      }
      return {
        ...state,
        loanAmount: "",
        loanPurpose: "",
        balance: state.balance + Number(action.payload),
        existedLoan: state.loanAmount,
      };
    case "payLoan":
      if (state.balance < state.existedLoan) {
        alert("You don't have enough balance");
        return state;
      }
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
    depositAmount: "",
    currency: "USD",
    withdrawalAmount: "",
    loanAmount: "",
    loanPurpose: "",
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
