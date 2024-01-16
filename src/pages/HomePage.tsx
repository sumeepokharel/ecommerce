import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { styled } from "@mui/material";

import Dashboard from "./dashboardpage/dashboard";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const StyledBox = styled(Box)({
  marginLeft: "15px",
  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  columnGap: "10px",
});

const HomePage: React.FC = () => {
  const [productsByCategory, setProductsByCategory] = useState<{
    [key: string]: Product[];
  }>({});
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products for each category when the component mounts
    fetchProductsByCategory("women");
    fetchProductsByCategory("men");
    fetchProductsByCategory("kids");
    fetchProductsByCategory("footwear");
  }, []);

  const fetchProductsByCategory = async (category: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8555/products/${category}`
      );
      console.log(`${category} Products:`, response.data);
      setProductsByCategory((prevProducts) => ({
        ...prevProducts,
        [category]: response.data.slice(0, 5),
      }));
    } catch (error) {
      console.error(`Error fetching ${category} products:`, error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    setSelectedProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <div>
      <StyledBox>
        {loading ? (
          <p>Loading ... </p>
        ) : (
          <>
            {Object.keys(productsByCategory).map((category) => (
              <React.Fragment key={category}>
                <h2>{category}</h2>
                {productsByCategory[category].map((product) => (
                  <Dashboard
                    key={product.id}
                    product={product}
                    addToCart={() => addToCart(product)}
                  />
                ))}
              </React.Fragment>
            ))}
          </>
        )}
      </StyledBox>
      <div>
        <h2>Shopping Cart</h2>
        {selectedProducts.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
