import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Product } from "../../redux/productSlice";

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
    <div className="product-detail-container">
      {product ? (
        <>
          <h2 className="product-name">{product.productName}</h2>
          <div className="product-info grid grid-cols-2 gap-4">
            {[1, 2].map((index) => (
              <img
                key={index}
                src={product.imageUrl}
                alt={product.productName}
                className={`product-image col-span-1 shadow-md border-2 border-${selectedColor.toLowerCase()}`}
              />
            ))}
            <div className="product-description col-span-2">
              <p>{product.productDescription}</p>
              <p className="product-price">${product.productPrice}</p>
            </div>
          </div>

          <div className="selection-container mt-4">
            <div className="select-box">
              <label className="mr-2">Select Size:</label>
              <select
                value={selectedSize}
                onChange={(e) => handleSizeChange(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="extra small"> XS</option>
                <option value="small">S</option>
                <option value="medium">M</option>
                <option value="large">L</option>
              </select>
            </div>

            <div className="select-box ml-4">
              <label className="mr-2">Select Color:</label>
              <select
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
            </div>
          </div>

          <button className="add-to-cart-btn mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
            Add to Cart
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
