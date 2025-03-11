import { useContext } from "react";
import { AccountContext } from "../contexts/accountContext.jsx";
import { convertCurrency } from "../utility/helper.jsx";
function AccountOperations() {
  const { accountState, accountDispatch } = useContext(AccountContext);
  const {
    currency,
    depositAmount,
    withdrawalAmount,
    loanAmount,
    loanPurpose,
    existedLoan,
  } = accountState;

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
            onChange={(e) =>
              accountDispatch({
                type: "setDepositAmount",
                payload: e.target.value,
              })
            }
          />
          <select
            value={currency}
            onChange={(e) =>
              accountDispatch({
                type: "setCurrency",
                payload: e.target.value,
              })
            }
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
            onChange={(e) =>
              accountDispatch({
                type: "setWithdrawalAmount",
                payload: e.target.value,
              })
            }
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
            onChange={(e) =>
              accountDispatch({
                type: "setLoanAmount",
                payload: e.target.value,
              })
            }
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) =>
              accountDispatch({
                type: "setLoanPurpose",
                payload: e.target.value,
              })
            }
            placeholder="Loan purpose"
          />
          <button
            onClick={() =>
              accountDispatch({
                type: "requestLoan",
                payload: loanAmount,
              })
            }
          >
            Request loan
          </button>
        </div>
        <div>
          <span>Pay back {existedLoan}</span>
          <button
            onClick={() =>
              accountDispatch({
                type: "payLoan",
                payload: existedLoan,
              })
            }
          >
            Pay loan
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountOperations;
