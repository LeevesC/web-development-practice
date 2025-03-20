import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import { useDispatch, useSelector } from "react-redux";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import { getCurrentQuantityById } from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector((state) =>
    getCurrentQuantityById(state, id)
  );
  const isInCart = currentQuantity > 0;

  function handleAddToCart(e) {
    e.preventDefault();
    dispatch(
      addItem({
        pizzaId: id,
        name,
        unitPrice,
        quantity: 1,
        totalPrice: unitPrice * 1,
      })
    );
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-3 md:gap-6">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button
              disabled={soldOut}
              to={`/cart`}
              handleClick={handleAddToCart}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
