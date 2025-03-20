import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "../cart/CartItem";
import EmptyCart from "../cart/EmptyCart";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "./cartSlice";
function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new">Order pizzas</Button>
        <Button handleClick={() => dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
