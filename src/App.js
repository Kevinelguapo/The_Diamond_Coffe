import React, { useEffect } from "react";

import { commerce } from "./lib/commerce";
import {
  setCart,
  setLoadingCart,
  setLoadingProducts,
  setProducts,
  setCategories,
} from "./store";
import { useDispatch, useSelector } from "react-redux";
import { Products, Navbar, Cart, Checkout, Home } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { teal, cyan } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    background: {
      default: "#fff",
      paper: "#F9F3EE",
      cart: "#DFD3C3", // a darker paper
      appBar: "#000",
      appBar2: "#596E79",
      darkGrey: "#333",
      lightGrey: "#ccc",
    },
    text: {
      primary: "#000",
      white: "#fff",
    },
    youtubeStepper: {
      active: "#DFD3C3",
      disabled: "#ccc",
    },

    mode: "light",

    primary: {
      main: teal[600],
      dark: teal[900],
      light: teal[100],
      contrastText: "#fff",
    },
    secondary: cyan,
    action: {
      active: teal[900],
      disabled: teal[100],
    },
  },
  typography: {
    fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
  },
});

theme = responsiveFontSizes(theme, {
  breakpoints: ["xs", "sm", "md", "lg", "xl"],
});

const App = () => {
  const dispatch = useDispatch();
  const { isLoadingProduct } = useSelector((state) => state.cart);

  const fetchCart = async () => {
    if (isLoadingProduct) return;
    dispatch(setLoadingCart(true));
    const cart = await commerce.cart.retrieve();
    console.log("cart", cart);
    dispatch(setCart(cart));
    dispatch(setLoadingCart(false));
  };

  const fetchProducts = async () => {
    dispatch(setLoadingProducts(true));
    const { data } = await commerce.products.list();
    dispatch(setProducts(data));

    // RETRIVE EACH PRODUCT

    const retriveProducts = async (item) => {
      const prod = await commerce.products.retrieve(item.id);
      return prod;
    };
    const promises = data.map((item) => retriveProducts(item));

    Promise.all(promises)
      .then((values) => {
        console.log(values);
        dispatch(setProducts(values));
        dispatch(setLoadingProducts(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();
    dispatch(setCategories(data));
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchCategories();
  }, []);

  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart fetchCart={fetchCart} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/turismo"
              element={
                <>
                  <br></br>
                  <br></br>
                  <h1>Turismo</h1>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </PayPalScriptProvider>
  );
};

export default App;
