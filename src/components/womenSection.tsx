import React, { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Items, addToCart } from "../redux/cartSlice";
import styles from "./Section.module.css";
interface Product {
  productId: number;
  productName: string;
  productPrice: number;
  imageUrl: string;
  productDescription: string;
}

const WomenSection: React.FC = () => {
  const [Products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.item);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get<Product[]>("http://localhost:8555/products")
      .then((response) => {
        // Filter kids products based on IDs (from 15 to 20)
        const filteredKidsProducts = response.data.filter(
          (product) => product.productId >= 2 && product.productId <= 7
        );
        setProducts(filteredKidsProducts);
      })
      .catch((error) => {
        console.error("Error fetching women  products:", error);
      });
  }, []);

  const handleAddToCart = (product: Product) => {
    const { productId, productName, productPrice, imageUrl } = product;

    // Create an item object to pass to addToCart action
    const item: Items = {
      id: productId,
      title: productName,
      category: "Womens",
      price: productPrice,
      quantity: 1,
      image: imageUrl,
    };

    // Dispatch the addToCart action with the item
    dispatch(addToCart(item));
  };

  return (
    <div className={styles.kidsSectionContainer}>
      <h1 className={styles.collectionTitle}> WOMEN COLLECTIONS</h1>
      <hr className={styles.hrLine} />

      <div className={styles.collections}>
        {Products.map((Product) => (
          <div key={Product.productId} className="m-4">
            <img
              src={Product.imageUrl}
              alt={Product.productName}
              className="w-full h-auto"
            />
            <p>{Product.productName}</p>
            <p>${Product.productPrice}</p>
            <p>{Product.productDescription}</p>
            <button
              className="bg-black text-white px-3 py-2 mt-2 hover:bg-blue hover:border-black hover:text-black border-2 border-black"
              style={{
                transition:
                  "background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out",
                transitionDelay: "0.1s",
              }}
              onClick={() => handleAddToCart(Product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenSection;
