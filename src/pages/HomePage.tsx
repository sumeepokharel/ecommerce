import React, { useState, useEffect } from "react";
import { fetchProducts } from "./fetchproduct";
import styles from "./HomePage.module.css";

interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  category: string;
  imageUrl: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all products when the component mounts
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const allProducts = await fetchProducts();
      console.log("API Response:", allProducts);

      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        {loading ? (
          <p>Loading ... </p>
        ) : (
          <>
            {products.map((product) => (
              <div key={product.productId} className={styles.productCard}>
                <h4 className={styles.productName}>{product.productName}</h4>
                <p className={styles.productDescription}>
                  {product.productDescription}
                </p>
                <img
                  src={product.imageUrl}
                  alt={`Product ${product.productName}`}
                  className={styles.productImage}
                />
                <h5 className={styles.productPrice}>
                  {product.productPrice !== undefined &&
                  product.productPrice !== null
                    ? `$${product.productPrice.toFixed(2)}`
                    : "Price not available"}
                </h5>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
