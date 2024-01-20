import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export interface Items {
  id: number;
  title: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}
export interface CartState {
  items: Items[];
  totalAmount: number;
  itemQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  itemQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Items>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.itemQuantity += 1;
      state.totalAmount += action.payload.price;

      toast.success("Item added to cart!");
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToRemove) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.itemQuantity -= itemToRemove.quantity;
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
        state.totalAmount = parseFloat(state.totalAmount.toFixed(2));
      }
    },
    increaseItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.itemQuantity += 1;
        state.totalAmount += item.price;
      }
    },
    decreaseItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.itemQuantity -= 1;
        state.totalAmount -= item.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.itemQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, increaseItem, decreaseItem, deleteItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
