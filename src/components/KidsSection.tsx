import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Section.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Items, addToCart } from "../redux/cartSlice";

interface KidsProduct {
  productId: number;
  productName: string;
  productPrice: number;
  imageUrl: string;
  productDescription: string;
}

const KidsSection: React.FC = () => {
  const [kidsProducts, setKidsProducts] = useState<KidsProduct[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.item);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get<KidsProduct[]>("http://localhost:8555/products")
      .then((response) => {
        // Filter kids products based on IDs (from 15 to 20)
        const filteredKidsProducts = response.data.filter(
          (product) => product.productId >= 15 && product.productId <= 20
        );
        setKidsProducts(filteredKidsProducts);
      })
      .catch((error) => {
        console.error("Error fetching kids products:", error);
      });
  }, []);

  const handleAddToCart = (product: KidsProduct) => {
    const { productId, productName, productPrice, imageUrl } = product;

    // Create an item object to pass to addToCart action
    const item: Items = {
      id: productId,
      title: productName,
      category: "Mens",
      price: productPrice,
      quantity: 1,
      image: imageUrl,
    };

    // Dispatch the addToCart action with the item
    dispatch(addToCart(item));
  };

  return (
    <div className={styles.kidsSectionContainer}>
      <h1 className={styles.collectionTitle}>KIDS COLLECTIONS</h1>
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
            <button
              className="bg-black text-white px-3 py-2 mt-2 hover:bg-white hover:border-black hover:text-black border-2 border-black"
              style={{
                transition:
                  "background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out",
                transitionDelay: "0.1s",
              }}
              onClick={() => handleAddToCart(kidsProduct)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KidsSection;
