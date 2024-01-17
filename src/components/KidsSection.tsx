import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}
const KidsSection: React.FC = () => {
  const [kidsProducts, setKidsProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get<Product[]>("http://localhost:8555/products")
      .then((response) => {
        setKidsProducts(response.data.slice(20, 25));
      })
      .catch((error) => {
        console.error("Error fetching kids products:", error);
      });
  }, []);

  return (
    <div className="m-12">
      <p className="text-4xl">Kids New Arrivals</p>
      <div className="flex">
        <span>Shop All</span>
        {/* Add any navigation link if needed */}
      </div>

      <div className="flex flex-wrap">
        {kidsProducts.map((kidsItem) => (
          <div key={kidsItem.id} className="m-4">
            {/* Render your component for each item */}
            <div>
              <img src={kidsItem.image} alt={kidsItem.title} />
              <p>{kidsItem.title}</p>
              <p>${kidsItem.price}</p>
              <p>{kidsItem.description}</p> {/* Render description */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KidsSection;
