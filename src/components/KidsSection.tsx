// KidsSection.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./KidsSection.module.css";

interface KidsProduct {
  productId: number;
  productName: string;
  productPrice: number;
  imageUrl: string;
  productDescription: string;
}

const KidsSection: React.FC = () => {
  const [kidsProducts, setKidsProducts] = useState<KidsProduct[]>([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get<KidsProduct[]>("http://localhost:8060/products")
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default KidsSection;
