import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories: [],
  isLoadingProducts: false,
  isLoadingCategories: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLoadingProducts: (state, action) => {
      state.isLoadingProducts = action.payload;
    },
    setLoadingCategories: (state, action) => {
      state.isLoadingCategories = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProducts,
  setCategories,
  setLoadingCategories,
  setLoadingProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
