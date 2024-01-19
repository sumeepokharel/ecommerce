import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

interface IInfo {
  productId: number;
  productName: string;
  productDescription: string;
  category: string;
  imageUrl: string;
  productPrice: number;
  redirectToCart?: boolean; // New prop to handle navigation
}

const Cart: React.FC<IInfo> = ({
  productId,
  productName,
  productDescription,
  category,
  imageUrl,
  productPrice,
  redirectToCart,
}) => {
  // If redirectToCart is true, navigate to the cart
  if (redirectToCart) {
    return <Navigate to="/cart" />;
  }

  // Get the total quantity from the Redux store
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.itemQuantity
  );

  // Use the provided image URL if available, otherwise use the default one
  const productImageUrl =
    imageUrl ||
    "https://plus.unsplash.com/premium_photo-1663100794006-58b06e8de412?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <>
      <div className="flex flex-col w-72 h-96 p-4">
        <div>
          <img
            src={productImageUrl}
            className="w-full h-80 object-cover"
            alt={`Product: ${productName}`}
          />
        </div>

        <p className="text-black text-sm tracking-2 font-light">
          {productName}
        </p>
        <p className="text-gray-500 text-sm">{productDescription}</p>
        <p className="text-gray-500 text-sm">{category}</p>
        <div className="text-sm">${productPrice}</div>

        {/* Display the total quantity in the cart */}
        <div className="text-sm mt-2">Total Items in Cart: {totalQuantity}</div>
      </div>
    </>
  );
};

export default Cart;
