import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Items, addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishListSlice";

interface KidsProduct {
  productId: number;
  productName: string;
  productPrice: number;
  imageUrl: string;
  productDescription: string;
}

const Groceries: React.FC = () => {
  const [kidsProducts, setKidsProducts] = useState<KidsProduct[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get<KidsProduct[]>("http://localhost:8555/products")
      .then((response) => {
        // Filter kids products based on IDs (from 15 to 20)
        const filteredKidsProducts = response.data.filter(
          (product) => product.productId >= 21 && product.productId <= 25
        );
        setKidsProducts(filteredKidsProducts);
      })
      .catch((error) => {
        console.error("Error fetching kids products:", error);
      });
  }, []);

  const handleAddToCart = (product: KidsProduct) => {
    const { productId, productName, productPrice, imageUrl } = product;
    const item: Items = {
      id: productId,
      title: productName,
      category: "Mens", // Update with the correct category
      price: productPrice,
      quantity: 1,
      image: imageUrl,
    };
    dispatch(addToCart(item));
  };

  const handleToggleWishlist = (productId: number) => {
    const isInWishlist = wishlist.some((item) => item.id === productId);

    if (isInWishlist) {
      dispatch(removeFromWishlist(productId));
    } else {
      const { productName, productPrice, imageUrl } = kidsProducts.find(
        (product) => product.productId === productId
      ) || { productName: "", productPrice: 0, imageUrl: "" };

      dispatch(
        addToWishlist({
          id: productId,
          title: productName,
          category: "Mens", // Update with the correct category
          price: productPrice,
          image: imageUrl,
        })
      );
    }
  };

  return (
    <div className={styles.kidsSectionContainer}>
      <h1 className={styles.collectionTitle}>GROCERIES</h1>
      <hr className={styles.hrLine} />

      <div className={styles.collections}>
        {kidsProducts.map((kidsProduct) => (
          <div key={kidsProduct.productId} className="m-4">
            <img
              src={kidsProduct.imageUrl}
              alt={kidsProduct.productName}
              className="w-full h-auto"
            />
            <p>{kidsProduct.productName}</p>
            <p>${kidsProduct.productPrice}</p>
            <p>{kidsProduct.productDescription}</p>
            <div className="flex space-x-2">
              <button
                className={`${styles.addToCartButton} px-3 py-2 hover:bg-blue hover:border-black hover:text-black border-2 border-black`}
                onClick={() => handleAddToCart(kidsProduct)}
              >
                Add to Cart
              </button>
              <button
                className={`${styles.addToWishlistButton} px-3 py-2 hover:bg-pink hover:border-black hover:text-black border-2 border-black`}
                onClick={() => handleToggleWishlist(kidsProduct.productId)}
              >
                {wishlist.some((item) => item.id === kidsProduct.productId) ? (
                  <>
                    Remove from Wishlist
                    <span className="ml-1" role="img" aria-label="heart">
                      &#x2764;
                    </span>
                  </>
                ) : (
                  <>
                    Add to Wishlist
                    <span className="ml-1" role="img" aria-label="heart">
                      &#x2764;
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groceries;
