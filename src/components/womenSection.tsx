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

const WomenSection: React.FC = () => {
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get<Product[]>("http://localhost:8555/products")
      .then((response) => {
        setWomenProducts(response.data.slice(10, 15)); // Adjust the range according to your needs
      })
      .catch((error) => {
        console.error("Error fetching women products:", error);
      });
  }, []);

  return (
    <div className="m-12">
      <p className="text-4xl">Women's New Arrivals</p>
      <div className="flex">
        <span>Shop All</span>
        {/* Add any navigation link if needed */}
      </div>

      <div className="flex flex-wrap">
        {womenProducts.map((womenItem) => (
          <div key={womenItem.id} className="m-4">
            {/* Render your component for each item */}
            <div>
              <img src={womenItem.image} alt={womenItem.title} />
              <p>{womenItem.title}</p>
              <p>${womenItem.price}</p>
              <p>{womenItem.description}</p> {/* Render description */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenSection;
