import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:8555/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
