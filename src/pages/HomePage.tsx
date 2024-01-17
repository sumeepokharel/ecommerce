import React, { useState, useEffect } from "react";
import { fetchProducts } from "./fetchproduct";
import styles from "./HomePage.module.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch the first 5 products when the component mounts
    fetchFirstFiveProducts();
  }, []);

  const fetchFirstFiveProducts = async () => {
    try {
      const allProducts = await fetchProducts();
      console.log("All Products:", allProducts);

      // Set only the first 5 products
      setProducts(allProducts.slice(2, 7));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    setSelectedProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <div>
      <div className={styles.container}>
        {loading ? (
          <p>Loading ... </p>
        ) : (
          <>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <h4 className={styles.productName}>{product.name}</h4>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <img
                  src={product.imageUrl}
                  alt={`Product ${product.name}`}
                  className={styles.productImage}
                />
                <h5 className={styles.productPrice}>
                  {product.price !== undefined && product.price !== null
                    ? `$${product.price.toFixed(2)}`
                    : "Price not available"}
                </h5>
                <button
                  className={styles.addToCartButton}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
