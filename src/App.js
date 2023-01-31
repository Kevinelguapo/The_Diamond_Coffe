import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout, Home } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setCartProducts } from "./store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0D4C92",
    },
    secondary: {
      main: "#59C1BD",
    },
  },
  typography: {
    body2: {
      fontFamily: "sans-serif",
    },
    h1: {
      fontFamily: "Tangerine",
    },
    fontFamily: "Solitreo",
    h3: {
      fontSize: "2.5rem",
      "@media (max-width: 470px)": {
        fontSize: "2rem",
      },
    },
  },
});

const App = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
    console.log(data);
  };

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

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
    setReduxCart(cart);
    console.log("cart", cart);
  };

  const handleAddToCart = async (productId, quantity, variantData) => {
    const newCart = await commerce.cart.add(productId, quantity, variantData);
    setCart(newCart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, {
      quantity: quantity,
    });
    console.log("update");
    setCart(response);
    setReduxCart(response);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await commerce.cart.remove(productId);
      console.log("removed");
      setCart(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    console.log("empty");
    setCart(response);
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
          <Navbar
            totalItems={cart?.total_items || 0}
            handleEmptyCart={handleEmptyCart}
          />
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
