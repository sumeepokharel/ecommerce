import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  deleteItem as deleteItemAction,
  increaseItem as increaseItemAction,
  decreaseItem as decreaseItemAction,
  clearCart as clearCartAction,
} from "../redux/cartSlice";

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate subtotal, shipping, and total items
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal >= 100 ? 0 : 5.99;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    try {
      // Simulate placing an order
      const response = await fetch("http://localhost:8666/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cartItems,
          subtotal: subtotal,
          shipping: shipping,
          totalItems: totalItems,
          total: total,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      // Clear the cart after a successful order placement
      dispatch(clearCartAction());
    } catch (error) {
      console.error("Error placing order:", error);

      // Handle error, show error message to the user
      if (error instanceof Error) {
        // If it's an instance of Error, use the error message
        alert(`Error placing order: ${error.message}`);
      } else {
        // If it's of unknown type, provide a generic error message
        alert("Error placing order. Please try again later.");
      }
    }
  };

  return (
    <div className="flex">
      {/* Billing Address Form on the left */}
      <div className="w-2/3 p-4">{/* ... (billing address form) ... */}</div>

      {/* Order Summary on the right */}
      <div className="w-1/3 p-4">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <p>
            <span className="font-bold">Subtotal:</span> ${subtotal.toFixed(2)}
          </p>
          <p>
            <span className="font-bold">Shipping:</span> ${shipping.toFixed(2)}
          </p>
          <p>
            <span className="font-bold">Total Items:</span> {totalItems}
          </p>
        </div>
        <hr className="my-4" />
        <p className="text-xl font-bold">
          <span className="font-bold">Total:</span> ${total.toFixed(2)}
        </p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          onClick={handlePlaceOrder}
        >
          Place An Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
