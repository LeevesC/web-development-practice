import { useContext, useState } from "react";
import { AccountContext } from "../contexts/accountContext.jsx";
import { convertCurrency } from "../utility/helper.jsx";
function AccountOperations() {
  const { accountState, accountDispatch } = useContext(AccountContext);

  const [depositAmount, setDepositAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");

  const { balance, existedLoan } = accountState;

  async function handleDeposit(e) {
    e.preventDefault();
    if (currency === "USD") {
      accountDispatch({
        type: "deposit",
        payload: depositAmount,
      });
    } else {
      const convertedAmount = await convertCurrency(
        currency,
        "USD",
        depositAmount
      );
      accountDispatch({
        type: "deposit",
        payload: convertedAmount,
      });
    }
    setDepositAmount("");
    setCurrency("USD");
  }

  function handleRequestLoan() {
    if (loanAmount <= 0 || loanPurpose === "") {
      alert("Please enter a valid loan amount and purpose");
      return;
    } else if (existedLoan) {
      alert("You already have a loan");
      return;
    }
    accountDispatch({
      type: "requestLoan",
      payload: loanAmount,
    });
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    if (existedLoan === "") {
      alert("You don't have a loan");
      return;
    } else if (balance < existedLoan) {
      alert("You don't have enough balance");
      return;
    }
    accountDispatch({
      type: "payLoan",
    });
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>Deposit {depositAmount}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
          />
          <button
            onClick={() =>
              accountDispatch({
                type: "withdraw",
                payload: withdrawalAmount,
              })
            }
          >
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>
        <div>
          <span>Pay back {existedLoan}</span>
          <button onClick={handlePayLoan}>Pay loan</button>
        </div>
      </div>
    </div>
  );
}

export default AccountOperations;
