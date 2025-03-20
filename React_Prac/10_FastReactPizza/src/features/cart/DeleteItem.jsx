import { deleteItem } from "./cartSlice";
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button handleClick={() => dispatch(deleteItem(pizzaId))}>Delete</Button>
  );
}

export default DeleteItem;
