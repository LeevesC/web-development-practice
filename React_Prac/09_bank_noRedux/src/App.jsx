import CreateCustomer from "./features/CreateCustomer";
import Customer from "./features/Customer";
import AccountOperations from "./features/AccountOperations";
import BalanceDisplay from "./features/BalanceDisplay";

//use context
import { useContext } from "react";
import { UserContext } from "./contexts/userContext.jsx";

function App() {
  const { userState } = useContext(UserContext);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!userState.isLoggedIn && <CreateCustomer />}
      {userState.isLoggedIn && (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
