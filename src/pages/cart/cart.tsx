import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  deleteItem as deleteItemAction,
  increaseItem as increaseItemAction,
  decreaseItem as decreaseItemAction,
  clearCart as clearCartAction,
} from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import styles from "./cart.module.css";

interface IInfo {
  productId: number;
  redirectToCart?: boolean;
}

const Cart: React.FC<IInfo> = ({ productId }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

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

  const handleDeleteItem = (itemId: number) => {
    dispatch(deleteItemAction(itemId));
  };

  const handleIncreaseItem = (itemId: number) => {
    dispatch(increaseItemAction(itemId));
  };

  const handleDecreaseItem = (itemId: number) => {
    dispatch(decreaseItemAction(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCartAction());
  };

  const handleProceedToCheckout = () => {
    // Use useNavigate to navigate to the "/Checkout" route
    navigate("/Checkout");
  };

  useEffect(() => {
    console.log("Is Authenticated (Effect):", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className={styles["cart-container"]}>
      {/* Cart details on the left */}
      <div className={styles["cart-details"]}>
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
                <td>
                  Quantity: {cartItem.quantity}{" "}
                  <button onClick={() => handleIncreaseItem(cartItem.id)}>
                    +
                  </button>
                  <button onClick={() => handleDecreaseItem(cartItem.id)}>
                    -
                  </button>
                </td>
                <td>
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
        <button onClick={handleClearCart}>Clear Cart</button>
      </div>

      {/* Proceed to Checkout button at the bottom */}
      <div className="flex-shrink-0 w-1/3 p-4">
        {isAuthenticated ? (
          <button
            className={styles["checkout-button"]}
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        ) : (
          <p>Please log in to proceed to checkout.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
