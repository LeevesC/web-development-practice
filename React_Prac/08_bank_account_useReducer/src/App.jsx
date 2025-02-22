import "./App.css";
import { useReducer } from "react";

const initialState = {
  isActive: false,
  balance: 0,
  loan: 0,
  errMsg: "",
};

function bankReducer(state, action) {
  switch (action.type) {
    case "openAccount": {
      return { ...state, balance: 500, isActive: true };
    }
    case "deposit": {
      return { ...state, balance: state.balance + 150 };
    }
    case "withdraw": {
      return { ...state, balance: state.balance - 50 };
    }
    case "reqLoan": {
      if (state.loan > 0)
        return { ...state, errMsg: "can get loan before you repay" };
      return { ...state, balance: state.balance + 5000, loan: 5000 };
    }
    case "closeErr": {
      return { ...state, errMsg: "" };
    }
    case "payLoan": {
      if (state.balance < 5000 && state.loan > 0)
        return { ...state, errMsg: "no enough balance" };
      if (state.loan <= 0) return state;
      return { ...state, balance: state.balance - 5000, loan: 0 };
    }
    case "closeAcc": {
      return { ...state, errMsg: "", balance: 0, loan: 0, isActive: false };
    }
  }
}

export default function App() {
  const [state, dispatch] = useReducer(bankReducer, initialState);
  if (state.errMsg) {
    alert(state.errMsg);
    dispatch({ type: "closeErr" });
  }
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {state.balance}</p>
      <p>Loan: {state.loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
          disabled={state.isActive ? true : false}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit" });
          }}
          disabled={state.isActive ? false : true}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw" });
          }}
          disabled={state.isActive ? false : true}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "reqLoan" });
          }}
          disabled={state.isActive ? false : true}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
          disabled={state.isActive ? false : true}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAcc" });
          }}
          disabled={state.isActive ? false : true}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
