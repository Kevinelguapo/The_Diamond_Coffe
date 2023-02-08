import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout, Home } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setCartProducts } from "./store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { teal, cyan, lightBlue } from "@mui/material/colors";

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
      main: cyan[400],
      light: cyan[200],
      dark: cyan[700],
    },
    action: {
      active: teal[700],
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
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const setReduxCart = (cart) => {
    let products = cart.line_items.map((item) => {
      return {
        id: item.id,
        lineTotal: item.line_total.raw,
        price: item.price.raw,
        quantity: item.quantity,
      };
    });
    dispatch(setCartProducts(products));
  };

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
    setReduxCart(cart);
  };

  const handleAddToCart = async (productId, quantity, variantData) => {
    const newCart = await commerce.cart.add(productId, quantity, variantData);
    setCart(newCart);
    console.log("added");
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const newCart = await commerce.cart.update(productId, {
      quantity: quantity,
    });
    setCart(newCart);
    setReduxCart(newCart);
    console.log("updated");
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const newCart = await commerce.cart.remove(productId);
      setCart(newCart);
      console.log("removed");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmptyCart = async () => {
    const newCart = await commerce.cart.empty();
    setCart(newCart);
  };

  useEffect(() => {
    fetchProducts();
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
          <Navbar handleEmptyCart={handleEmptyCart} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={
                <Products products={products} onAddToCart={handleAddToCart} />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  fetchCart={fetchCart}
                  handleUpdateCartQty={handleUpdateCartQty}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleEmptyCart={handleEmptyCart}
                />
              }
            />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
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
