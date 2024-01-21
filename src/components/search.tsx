import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { Items, addToCart } from "../redux/cartSlice";
import { AppDispatch } from "../redux/store";

interface Product {
  productId: number;
  productName: string;
  productPrice: number;
  imageUrl: string;
  productDescription: string;
}

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch all products from the backend when the component mounts
    const fetchProducts = async () => {
      try {
        const response: AxiosResponse<Product[]> = await axios.get(
          "http://localhost:8555/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      // Filter products based on the search term
      const results = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Set the search results state
      setSearchResults(results);

      // Handle the search results (e.g., display them in a component)
      console.log("Search results:", results);
    }
  };

  const handleAddToCart = (product: Product) => {
    const item: Items = {
      id: product.productId,
      title: product.productName,
      category: "YourCategory", // Replace with the actual category
      price: product.productPrice,
      quantity: 1, // Assuming the default quantity is 1
      image: product.imageUrl,
    };

    dispatch(addToCart(item));
    // You can also add additional logic, e.g., show a confirmation message.
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded-l-md focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded-r-md"
      >
        <BsSearch />
      </button>

      {/* Display search results if available */}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result) => (
            <div key={result.productId} className="search-result-item">
              <span className="text-lg flex justify-center p-3">
                {result.productName}
              </span>
              <img
                src={result.imageUrl}
                alt={result.productName}
                className="p-2 max-w-full h-auto max-h-48"
              />
              <div className="text-sm text-slate-500 mx-5 mt-2"></div>
              <div className="mx-5 mt-5 text-lg">${result.productPrice}</div>
              {/* Add to Cart button */}
              <button
                className="px-3 py-2 hover:bg-blue-700 hover:border-blue-700 hover:text-white border-2 border-blue-500"
                onClick={() => handleAddToCart(result)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
