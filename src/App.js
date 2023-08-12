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
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Box, Divider, Stack, Typography } from "@mui/material";
import CoffeeIcon from '@mui/icons-material/Coffee';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme"
import Tourism from "./components/Turism/Turism";
import { TourismPlace } from "./components/Turism/Turism";


export const CoffeeDivider = () => {

  const MiniDivider = () => (
    <Divider
      sx={{
        width: "40%",
        height: 1,
        color: "divider.coffee",
        my: { xs: 2, md: 4 },
      }}
    />
  )

  return (
    <Box sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "16px",
      mx: { xs: 2, md: 4 },
    }}>

      <MiniDivider />
      <CoffeeIcon sx={{ color: "divider.coffee" }} />
      <MiniDivider />

    </Box>
  )
}


const App = () => {

  const dispatch = useDispatch();
  const { isLoadingProduct } = useSelector((state) => state.cart);
  const { deferLoading } = useSelector((state => state))

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
    // dispatch(setProducts(data));

    // RETRIVE EACH PRODUCT TO GET MORE REQUIRED INFORMATION 

    const retriveProducts = async (item) => {
      const product = await commerce.products.retrieve(item.id);
      return product;
    };

    const promises = data.map((item) => retriveProducts(item));
    Promise.all(promises)
      .then((values) => {
        // console.log(values);
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

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });


  const centeredStackSx = {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  }


  const NotFound = () => {
    return (
      <Stack sx={centeredStackSx}>
        <Typography variant="h1" sx={{ my: 2 }} >
          404 Not Found
        </Typography>
        <CoffeeDivider />
        <Typography variant="h2" sx={{ my: 2 }}>
          La página que buscas no existe
        </Typography>
      </Stack>
    )
  }

  // --------------------------------------------------

  return (
    <PayPalScriptProvider
      deferLoading={deferLoading}
      options={{
        // "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
        // "client-id": process.env.REACT_APP_PAYPAL_SANDBOX_CLIENT_ID
        "client-id": "AZAGUVOrDqOAdp7LTVgYb8SKRXKJDrehXI1wYcREbe4Ja9xgWKGLJP6HhHB3EPeSFb9ce9OwUlnCXW01"
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Box height="80px" /> {/* this is to avoid navbar to cover the content */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products formatter={formatter} />} />

            {/* add coffe divider to cart and checkout */}

            <Route path="/cart" element={<Cart fetchCart={fetchCart} formatter={formatter} />} />
            <Route path="/checkout" element={<Checkout formatter={formatter} />} />

            {/* testing dinamic routes */}

            <Route path="/turismo" element={<Tourism />} />
            <Route
              path="/turismo/:turismoId"
              element={<TourismPlace />}
            />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </PayPalScriptProvider>
  );
};


export default App;
