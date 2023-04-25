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
import { teal, cyan, grey, blueGrey } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    background: {
      default: "#000",
      paper: "#2C3639",
      darkPaper: "#2C3333",
      appBar: "#000",
      appBar2: "#2E4F4F",
      white: "#fff",
    },

    border: {
      main: teal[600],
      grey: blueGrey["A100"],
      darkGrey: blueGrey["A400"],
      darkCoffee: "#7A5A3F",
      lightCoffee: "#F4DFBA",
      lightCoffee2: "#DCD7C9",

    },
    
    divider: {
      main: teal[900],
      light: teal["100"],
      coffee: "#CBAF87",
      gold: "#FFD966", 
      // gold: FFD966
    },

    primary: {
      main: teal[600],
      dark: teal[900],
      light: teal[100],
      contrastText: "#fff",
    },
    secondary: {
      main: cyan[600],
      dark: cyan[900],
      light: cyan[100],
    },
    coffee: {
      main: "#A27B5C",
      dark: "#7A5A3F",
      light: "#DCD7C9",
    },
    action: {
      active: teal[50],
      disabled: teal[900],
    },
    text: {
      primary: "#fff",
      secondary: "#000",
      disabled: "rgba(0,0,0,0.38)",
    },
  },
  typography: {
    h1: {
      fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
    },
  },
});

document.body.style.color = theme.palette.text.primary;

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
