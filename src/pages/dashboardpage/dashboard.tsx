import React from "react";
import { Button, Typography } from "@mui/material";
import styles from "./Dashboard.module.css";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

interface DashboardProps {
  product: Product;
  addToCart: () => void;
}

const DashboardPage: React.FC<DashboardProps> = ({ product, addToCart }) => {
  // Function to format price as currency
  const formatPrice = (price: number): string => {
    // You can customize the formatting based on your needs
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardImage}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.cardContent}>
        <Typography variant="h4" className={styles.productName}>
          {product.name}
        </Typography>
        <Typography variant="body1" className={styles.productDescription}>
          {product.description}
        </Typography>
        <Typography variant="h5" className={styles.productPrice}>
          {formatPrice(product.price)}
        </Typography>
        <Button
          variant="outlined"
          className={styles.addToCartButton}
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
