import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  addToWishList,
  removeFromWishList,
  Items,
} from "../../redux/wishListSlice";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { PiSmileySadThin } from "react-icons/pi";
import { addToCart } from "../../redux/cartSlice";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const wishlistpage = () => {
  const item = useSelector((state: RootState) => state.wishlist.item);
  const dispatch = useDispatch();

  const handleCart = (item: Items) => {
    dispatch(addToCart(item));
  };
  const handleRemove = (id: number) => {
    dispatch(removeFromWishList(id));
  };
  return (
    <>
      <div className="w-full h-auto ">
        <Navbar />
        <div className="text-center text-3xl mt-6">WISHLIST</div>
        <div className="border-t border-gray-300 m-4"></div>
        {item.length === 0 ? (
          <div className="flex flex-col mx-auto justify-center items-center text-3xl h-screen border-2 bg-white w-[75%]">
            <p className="p-3"> Your WishList is Empty! </p>
            <PiSmileySadThin size={70} />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 w-[75%] mx-auto  text-xl p-4">
            {item.map((item) => (
              <div className=" p-4 h-full flex flex-col ">
                <div className=" flex flex-col  w-72 h-96 p-4">
                  <div className="flex justify-between">
                    <AiOutlineDelete
                      className="fill-slate-900"
                      onClick={() => {
                        handleRemove(item.id);
                      }}
                    />
                    <CiShoppingCart onClick={() => handleCart(item)} />
                  </div>
                  <img src={item.image} className="w-full h-80 object-cover" />

                  <div className="text-black text-sm tracking-2 font-light">
                    {item.title}
                  </div>
                  <div className="text-sm ">$ {item.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default wishlistpage;
