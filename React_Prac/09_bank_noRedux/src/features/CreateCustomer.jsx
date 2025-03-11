import { useContext } from "react";
import { UserContext } from "../contexts/userContext.jsx";

function Customer() {
  const { userState, userDispatch } = useContext(UserContext);

  if (userState.isLoggedIn) return <div>Customer created successfully</div>;
  return (
    <div>
      <h2>Create new customer</h2>
      <form className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={userState.fullName}
            onChange={(e) =>
              userDispatch({
                type: "updateFullName",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={userState.nationalId}
            onChange={(e) =>
              userDispatch({
                type: "updateNationalId",
                payload: e.target.value,
              })
            }
          />
        </div>
        <button onClick={() => userDispatch({ type: "login" })}>
          Create new customer
        </button>
      </form>
    </div>
  );
}

export default Customer;
