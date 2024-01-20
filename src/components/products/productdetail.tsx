import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Product } from "../../redux/productSlice";
import styles from "./ProductDetailPage.module.css";

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8555/products/${productId}`
        );
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className={styles["product-detail-container"]}>
      {product ? (
        <>
          <h2 className={styles["product-name"]}>{product.productName}</h2>
          <div className={styles["product-info"]}>
            <img
              src={product.imageUrl}
              alt={product.productName}
              className={styles["product-image"]}
              style={{ boxShadow: `0 0 5px ${selectedColor}` }}
            />
            <div className={styles["product-description"]}>
              <p>{product.productDescription}</p>
              <p className={styles["product-price"]}>${product.productPrice}</p>
            </div>
          </div>

          <div className={styles["selection-container"]}>
            <div className={styles["select-box"]}>
              <label>Select Size:</label>
              <select
                value={selectedSize}
                onChange={(e) => handleSizeChange(e.target.value)}
              >
                {/* ...options */}
              </select>
            </div>

            <div className={styles["select-box"]}>
              <label>Select Color:</label>
              <select
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
              >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
            </div>
          </div>

          <button className={styles["add-to-cart-btn"]}>Add to Cart</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
