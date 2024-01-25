import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromWishlist } from "../../redux/wishListSlice";

const Wishlist: React.FC = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (itemId: number) => {
    dispatch(removeFromWishlist(itemId));
  };

  return (
    <div>
      <h2>Wishlist Items</h2>
      <ul>
        {wishlistItems.map((item) => (
          <li key={item.id}>
            {item.title} - ${item.price}
            <button onClick={() => handleRemoveFromWishlist(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
