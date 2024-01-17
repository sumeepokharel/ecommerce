import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
export interface Items {
  id: number;
  title: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
}

export interface State {
  item: Items[];
}
const initialState: State = {
  item: [],
};

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<Items>) => {
      state.item.push(action.payload);
    },
    removeFromWishList: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id !== action.payload);
    },
  },
});
export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
