import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishListSlice";
import { useNavigate } from "react-router-dom";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      // Set only the first eight products
      setProducts(allProducts.slice(0, 8));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCartHandler = (product: Product) => {
    dispatch(
      addToCart({
        id: product.productId,
        title: product.productName,
        category: product.category,
        price: product.productPrice,
        quantity: 1,
        image: product.imageUrl,
      })
    );
    navigate("/cart");
  };

  const addToWishlistHandler = (product: Product) => {
    dispatch(
      addToWishlist({
        id: product.productId,
        title: product.productName,
        category: product.category,
        price: product.productPrice,
        image: product.imageUrl,
      })
    );
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
                <div className={styles.buttonsContainer}>
                  <button
                    className={styles.addToCartButton}
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className={styles.addToWishlistButton}
                    onClick={() => addToWishlistHandler(product)}
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
