import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    id: null,
    total_items: 0,
    total_unique_items: 0,
    line_items: [],
    subtotal: {
      raw: 0,
      formatted_with_symbol: "$0.00",
    },
    currency: {
      code: "COP",
      symbol: "$",
    },
  },
  confirmed: false,
  isLoadingProduct: false,
  isLoadingCart: false,
};

const calcTotalItems = (items) => {
  return items?.reduce((acc, item) => acc + item?.quantity, 0);
};
const calcSubTotal = (items) => {
  return items?.reduce((acc, item) => acc + item?.line_total.raw, 0);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },

    incrementItem: (state) => {
      state.cart.total_items += 1;
    },

    updateQuantity: (state, action) => {
      state.cart.line_items = state.cart.line_items.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = action.payload.quantity;
          item.line_total.raw = item.price.raw * item.quantity;
        }
        return item;
      });
      state.cart.total_items = calcTotalItems(state.cart.line_items);
      state.cart.subtotal.raw = calcSubTotal(state.cart.line_items);
    },

    removeItem: (state, action) => {
      state.cart.line_items = state.cart.line_items.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart.total_items = calcTotalItems(state.cart.line_items);
      state.cart.subtotal.raw = calcSubTotal(state.cart.line_items);
      state.cart.total_unique_items = state.cart.line_items.length;
    },

    setConfirmed: (state, action) => {
      state.confirmed = action.payload;
    },
    setLoadingProduct: (state, action) => {
      state.isLoadingProduct = action.payload;
    },
    setLoadingCart: (state, action) => {
      state.isLoadingCart = action.payload;
    },
    setEmptyCart: (state) => {
      state.cart = initialState.cart;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  incrementItem,
  removeItem,
  updateQuantity,
  setConfirmed,
  setCart,
  setLoadingProduct,
  setLoadingCart,
  setEmptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
