import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import Checkout from "./Checkout";
import {
  deleteItem as deleteItemAction,
  increaseItem as increaseItemAction,
  decreaseItem as decreaseItemAction,
} from "../redux/cartSlice";

interface IInfo {
  productName: string;
  productId: number;
  productDescription: string;
  category: string;
  imageUrl: string;
  productPrice: number;
  redirectToCart?: boolean; // New prop to handle navigation
}

const Cart: React.FC<IInfo> = ({ productId, redirectToCart }) => {
  // If redirectToCart is true, navigate to the cart
  if (redirectToCart) {
    return <Navigate to="/cart" />;
  }

  // Fetch the product details based on productId (replace this with your actual logic)
  const product = useSelector((state: RootState) =>
    state.products.item.find((product) => product.productId === productId)
  );

  // Get the total quantity, total price, and cart items from the Redux store
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.itemQuantity
  );
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Dispatch actions for cart operations
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook

  const handleDeleteItem = (itemId: number) => {
    dispatch(deleteItemAction(itemId));
  };

  const handleIncreaseItem = (itemId: number) => {
    dispatch(increaseItemAction(itemId));
  };

  const handleDecreaseItem = (itemId: number) => {
    dispatch(decreaseItemAction(itemId));
  };

  const handleProceedToCheckout = () => {
    // Use useNavigate to navigate to the "/Checkout" route
    navigate("/Checkout");
  };

  return (
    <div className="flex">
      {/* Cart page on the left */}
      <div className="flex-shrink-0 w-2/3">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        {product && (
          <table className="w-full">
            <tbody>
              <tr>
                <td>Product Name:</td>
                <td>{product.productName}</td>
              </tr>
              <tr>
                <td>Product Description:</td>
                <td>{product.productDescription}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>${product.productPrice}</td>
              </tr>
              {/* Add more product-related information as needed */}
            </tbody>
          </table>
        )}
        <table className="w-full mt-4">
          <tbody>
            {cartItems.map((cartItem) => (
              <tr key={cartItem.id}>
                <td>{cartItem.title}</td>
                <td>${cartItem.price}</td>
                <td>Quantity: {cartItem.quantity}</td>
                <td>
                  <button onClick={() => handleIncreaseItem(cartItem.id)}>
                    +
                  </button>
                  <button onClick={() => handleDecreaseItem(cartItem.id)}>
                    -
                  </button>
                  <button onClick={() => handleDeleteItem(cartItem.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>Total Quantity:</td>
              <td>{totalQuantity}</td>
            </tr>
            <tr>
              <td>Total Amount:</td>
              <td>${totalAmount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Proceed to Checkout button on the right */}
      <div className="flex-shrink-0 w-1/3 p-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleProceedToCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
