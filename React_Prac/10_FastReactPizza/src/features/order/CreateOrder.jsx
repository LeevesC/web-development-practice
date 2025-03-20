import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import { clearCart } from "../cart/cartSlice";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const {
    username,
    address,
    error: addressError,
    status: addressStatus,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input" />
            {formErrors?.phone && (
              <p className="text-xs mt-2 bg-red-100 p-2 text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="text-xs mt-2 bg-red-100 p-2 text-red-700">
                {addressError}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              dispatch(fetchAddress());
            }}
            disabled={isLoadingAddress}
          >
            {isLoadingAddress ? "Loading..." : "Get position"}
          </button>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting}>
            {isSubmitting ? "placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };
  // error data type handling
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give us your correct phone number.";
  if (Object.keys(errors).length > 0) return errors;
  // if each data type is valid, create new order
  const newOrder = await createOrder(order);
  // console.log(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
