import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchProduct, Product } from "../../redux/productSlice";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import styles from "./products.module.css"; // Import the styles

const Products: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const products = useSelector((state: RootState) => state.products.item);

  return (
    <div>
      <h2>Shop All</h2>
      <hr className={styles.hrLine} />
      <div className={styles.productGrid}>
        {products.map((product: Product) => (
          <div key={product.productId} className={styles.product}>
            <Link to={`/product/${product.productId}`}>
              <img src={product.imageUrl} alt={product.productName} />
              <div className={styles["product-info"]}>
                <div>{product.productName}</div>
                <div>Price: ${product.productPrice}</div>
                {/* Add more product information as needed */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
