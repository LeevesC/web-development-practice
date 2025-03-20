import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
import { useSelector } from "react-redux";
function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="mb-8 text-xl text-stone-700 font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? <CreateUser /> : <Button to="/menu">Continue</Button>}
    </div>
  );
}

export default Home;
