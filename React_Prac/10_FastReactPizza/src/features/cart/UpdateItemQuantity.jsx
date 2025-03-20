import Button from "../../ui/Button";
import { decrementItemQuantity, incrementItemQuantity } from "./cartSlice";
import { useDispatch } from "react-redux";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button handleClick={() => dispatch(decrementItemQuantity(pizzaId))}>
        -
      </Button>
      <p className="text-sm font-medium">{currentQuantity}</p>
      <Button handleClick={() => dispatch(incrementItemQuantity(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
