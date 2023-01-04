import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalItems: 0,
  subTotal: 0,
  confirmed: false,
};

const calcTotalItems = (products) => {
  return products?.reduce((acc, item) => acc + item?.quantity, 0);
};
const calcSubTotal = (products) => {
  return products?.reduce((acc, item) => acc + item?.lineTotal, 0);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartProducts: (state, action) => {
      state.products = action.payload;
      state.totalItems = calcTotalItems(state?.products);
      state.subTotal = calcSubTotal(state?.products);
    },
    incrementItem: (state) => {
      state.totalItems += 1;
    },
    decrementQuantity: (state, action) => {
      state.products = state.products.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity -= 1;
          item.lineTotal = item.price * item.quantity;
        }
        return item;
      });
      state.totalItems = calcTotalItems(state?.products);
      state.subTotal = calcSubTotal(state?.products);
    },
    incrementQuantity: (state, action) => {
      state.products = state.products.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity += 1;
          item.lineTotal = item.price * item.quantity;
        }
        return item;
      });
      state.totalItems = calcTotalItems(state?.products);
      state.subTotal = calcSubTotal(state?.products);
    },

    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      state.totalItems = calcTotalItems(state?.products);
      state.subTotal = calcSubTotal(state?.products);
      // state.totalItems = state.totalItems - action.payload.quantity;
      // state.subTotal = state.subTotal - action.payload.lineTotal;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    setConfirmed: (state, action) => {
      state.confirmed = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCartProducts,
  incrementItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  setConfirmed,
} = cartSlice.actions;

export default cartSlice.reducer;
