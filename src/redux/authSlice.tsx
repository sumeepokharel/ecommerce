import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the stored authentication data
interface StoredAuthData {
  username: string | null;
  isAuthenticated: boolean;
}

// Try to load authentication data from localStorage
const storedAuthData: StoredAuthData | null = JSON.parse(
  localStorage.getItem("authData") || "null"
);

// Define the initial state based on the stored data or defaults
const initialState = {
  username: storedAuthData ? storedAuthData.username : null,
  isAuthenticated: storedAuthData ? storedAuthData.isAuthenticated : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.isAuthenticated = true;
      // Save the updated authentication data to localStorage
      localStorage.setItem(
        "authData",
        JSON.stringify({ username: action.payload, isAuthenticated: true })
      );
    },
    logout: (state) => {
      state.username = null;
      state.isAuthenticated = false;
      // Remove authentication data from localStorage
      localStorage.removeItem("authData");
    },
  },
});

export const { setLoggedInUser, logout } = authSlice.actions;

export default authSlice.reducer;
