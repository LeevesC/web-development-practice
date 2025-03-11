import { useContext } from "react";
import { AccountContext } from "../contexts/accountContext.jsx";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const { accountState } = useContext(AccountContext);
  return <div className="balance">{formatCurrency(accountState.balance)}</div>;
}

export default BalanceDisplay;
