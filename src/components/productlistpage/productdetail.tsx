import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchProduct } from "../../redux/productSlice";
import { Items, addToCart } from "../../redux/cartSlice";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { CiStar } from "react-icons/ci";

function ProductDetailPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("search");
  const colors = ["red", "blue", "green", "yellow"];

  console.log(id);
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: RootState) => state.products.item);
  const product = products.find((item) => item.id === Number(id));
  console.log(products);
  console.log(id);
  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }
  function getBackgroundColor(color: string) {
    if (color === "red") {
      return "bg-red-200";
    }
    if (color === "blue") {
      return "bg-blue-200";
    }
    if (color === "green") {
      return "bg-green-200";
    }
    if (color === "yellow") {
      return "bg-yellow-200";
    }
  }
  const handleAddToCart = (item: Items) => {
    dispatch(addToCart(item));
  };

  return (
    <>
      <Navbar />
      <div className="border-t border-gray-300 m-4"></div>
      <div className="flex items-center justify-between p-8">
        <div className="w-1/2">
          <img
            src={product?.image}
            alt="Product"
            className="w-full rounded-lg "
          />
        </div>

        <div className=" w-1/2 px-8 ml-8">
          <div className=" flex flex-col items-center  ">
            <h2 className="text-3xl font-bold mb-4">{product?.title}</h2>
            <div className="flex mt-3">
              <CiStar />
              <CiStar />
              <CiStar />
              <CiStar />
              <CiStar />
            </div>
            <p className="text-xl mt-3">${product?.price}</p>
            <div className="text-gray-700">Select Color:</div>
            <div className="mb-4">
              <div className="flex mt-4">
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 rounded-full mx-2 cursor-pointer ${getBackgroundColor(
                      color
                    )}`}
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex ">
              <button
                className="bg-black text-white px-3 py-2 m-2 hover:bg-white hover:border-black hover:text-black border-2 border-black"
                style={{
                  transition:
                    "background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out",
                  transitionDelay: "0.1s",
                }}
              >
                XS
              </button>
              <button
                className="bg-black text-white px-3 py-2 m-2 hover:bg-white hover:border-black hover:text-black border-2 border-black"
                style={{
                  transition:
                    "background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out",
                  transitionDelay: "0.1s",
                }}
              >
                S
              </button>
              <button
                className="bg-black text-white px-3 py-2 m-2 hover:bg-white hover:border-black hover:text-black border-2 border-black"
                style={{
                  transition:
                    "background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out",
                  transitionDelay: "0.1s",
                }}
              >
                M
              </button>
              <button className="bg-black text-white px-3 py-2 m-2 hover:bg-white hover:border-black hover:text-black border-2 border-black">
                L
              </button>
              <button className="bg-black text-white px-3 py-2 m-2 hover:bg-white hover:border-black hover:text-black border-2 border-black">
                XL
              </button>
            </div>
            <button
              className="bg-black text-white px-3 py-2 mt-2 hover:bg-white hover:border-black hover:text-black border-2 border-black"
              style={{
                transition:
                  "background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out",
                transitionDelay: "0.1s",
              }}
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
          <div className="border-t border-gray-500 mt-4"></div>
          <h1 className="text-slate-500 mt-4">DESCRIPTION</h1>
          <p className="text-slate-700 mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            alias repellat corporis dignissimos aliquid! Beatae numquam expedita
            accusantium aperiam quia laboriosam veritatis et deserunt saepe
            eligendi molestias, rerum ipsum omnis.
          </p>
          <div className="border-t border-gray-500 mt-4"></div>
          <h1 className="text-slate-500 mt-4">SHIPPING & RETURNS</h1>
          <p className="text-slate-700 mt-4">
            Free shipping on domestic orders over $100, and returns on all
            full-price items within two weeks of delivery.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetailPage;
