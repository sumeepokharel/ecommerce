import React from "react";
import { Navigate } from "react-router-dom";

interface IInfo {
  productId: number;
  productName: string;
  productDescription: string;
  category: string;
  imageUrl: string;
  price: number;
  redirectToCart?: boolean; // New prop to handle navigation
}

const Cart: React.FC<IInfo> = ({
  productId,
  productName,
  productDescription,
  category,
  imageUrl,
  price,
  redirectToCart,
}) => {
  // If redirectToCart is true, navigate to the cart
  if (redirectToCart) {
    return <Navigate to="/cart" />;
  }

  return (
    <>
      <div className="flex flex-col w-72 h-96 p-4">
        <div>
          <img
            src={imageUrl}
            className="w-full h-80 object-cover"
            alt={`Product: ${productName}`}
          />
        </div>

        <p className="text-black text-sm tracking-2 font-light">
          {productName}
        </p>
        <p className="text-gray-500 text-sm">{productDescription}</p>
        <p className="text-gray-500 text-sm">{category}</p>
        <div className="text-sm">${price}</div>
      </div>
    </>
  );
};

export default Cart;
