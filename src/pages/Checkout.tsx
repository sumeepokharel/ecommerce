import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate subtotal, shipping, and total items
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal + shipping;

  return (
    <div className="flex">
      {/* Billing Address Form on the left */}
      <div className="w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4">Billing Address</h2>
        {/* Add your billing address form here */}
        {/* Example Form: */}
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Email Address:</label>
              <input type="email" name="email" required className="w-full" />
            </div>
            <div>
              <label>Country:</label>
              <input type="text" name="country" required className="w-full" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label>Address Line 1:</label>
              <input type="text" name="address1" required className="w-full" />
            </div>
            <div>
              <label>Address Line 2:</label>
              <input type="text" name="address2" className="w-full" />
            </div>
            <div>
              <label>State:</label>
              <input type="text" name="state" required className="w-full" />
            </div>
          </div>

          <div>
            <label>ZIP Code:</label>
            <input type="text" name="zip" required className="w-full" />
          </div>
        </form>
      </div>

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
        <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
          Place An Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
