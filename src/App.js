import React, { useEffect } from "react";

import { commerce } from "./lib/commerce";
import { setCart, setLoadingCart } from "./store";
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
      cart: "#DFD3C3",
      appBar: "#000",
      appBar2: "#596E79",
    },

    mode: "light",

    primary: {
      main: teal[500],
      light: teal[200],
      dark: teal[700],
    },
    secondary: {
      main: cyan[500],
      light: cyan[200],
      dark: cyan[800],
    },
    action: {
      active: teal[900],
      disabled: "#AFBEBF",
    },
  },
  typography: {
    fontFamily: "Solitreo",
    h1: {
      fontFamily: "Tangerine",
      fontSize: "6rem",
      fontWeight: 400,
    },
    h3: {
      fontWeight: 300,
    },

    body2: {
      fontWeight: 300,
      fontFamily: "Lucida Sans Unicode",
    },
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

  // const fetchProducts = async () => {
  //   const { data } = await commerce.products.list();
  //   setProducts(data);
  // };

  useEffect(() => {
    fetchCart();
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
              path="/contact"
              element={
                <>
                  <br></br>
                  <br></br>
                  <h1>Contact</h1>
                </>
              }
            />
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
