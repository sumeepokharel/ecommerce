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

const MenSection: React.FC = () => {
  const [menProducts, setMenProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get<Product[]>("http://localhost:8555/products")
      .then((response) => {
        setMenProducts(response.data.slice(0, 5)); // Adjust the range according to your needs
      })
      .catch((error) => {
        console.error("Error fetching men products:", error);
      });
  }, []);

  return (
    <div className="m-12">
      <p className="text-4xl">Men's New Arrivals</p>
      <div className="flex">
        <span>Shop All</span>
        {/* Add any navigation link if needed */}
      </div>

      <div className="flex flex-wrap">
        {menProducts.map((menitem) => (
          <div key={menitem.id} className="m-4">
            {/* Render your component for each item */}
            <div>
              <img src={menitem.image} alt={menitem.title} />
              <p>{menitem.title}</p>
              <p>${menitem.price}</p>
              <p>{menitem.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenSection;
