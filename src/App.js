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
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { teal, cyan, blueGrey } from "@mui/material/colors";
import { Box, Divider, Typography } from "@mui/material";
import CoffeeIcon from '@mui/icons-material/Coffee';


let theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#c0c0c0",
          },
        },
      },
    },
  },

  palette: {
    background: {
      default: "#000",
      paper: "#2C3639",
      darkPaper: "#1C2323",
      appBar: "#000",
      appBar2: "#2E4F4F",
      white: "#fff",
    },

    border: {
      main: teal[900],
      grey: blueGrey["A100"],
      darkGrey: "#2E4F4F",
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
      secondary: "#c0c0c0",
      black: "#000",
      disabled: "rgba(0,0,0,0.38)",
      coffee: "#CBAF87",
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

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

  const CoffeeDivider = (
    <Box sx={{
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "16px",
      my: "16px",
    }}>
      <Divider
        sx={{
          width: "40%",
          height: "1px",
          bgcolor: "divider.coffee",
          my: "16px",
        }}
      />
      <CoffeeIcon sx={{
        color: "divider.coffee",
      }} />
      <Divider
        sx={{
          width: "40%",
          height: "1px",
          bgcolor: "divider.coffee",
          my: "16px",
        }}
      />
    </Box>
  )

  // testing dynamic routes

  const turismoPlaces = [
    {
      id: 1,
      name: "Casa de la cultura",
      description: "Casa de la cultura de la ciudad de Armenia",
      image: "https://www.culturarmenia.gov.co/wp-content/uploads/2020/08/IMG_20200819_111724_1.jpg",
    },
    {
      id: 2,
      name: "Parque de la vida",
      description: "Parque de la vida de la ciudad de Armenia",
      image: "https://www.culturarmenia.gov.co/wp-content/uploads/2020/08/IMG_20200819_111724_1.jpg",
    },
    {
      id: 3,
      name: "Parque del cafe",
      description: "Parque del cafe de la ciudad de Armenia",
      image: "https://www.culturarmenia.gov.co/wp-content/uploads/2020/08/IMG_20200819_111724_1.jpg",
    },
  ];

  const sxStyle = {
    pt: "80px",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }

  const TurismoPage = ({ CoffeeDivider }) => {
    return (
      <Box sx={sxStyle}>
        <Typography variant="h5" sx={{
          my: "16px",
        }}>
          *This is testing, it's not real*
        </Typography>
        <Typography variant="h1" sx={{
          my: "16px",
        }}>
          Turismo
        </Typography>
        {CoffeeDivider}
        <ul>
          {turismoPlaces.map((place) => (
            <li key={place.id}>
              <Link to={`/turismo/${place.id}`}>
                {place.name}
              </Link>
            </li>
          ))}
        </ul>

      </Box>
    )
  }

  const TurismoPlace = () => {
    const { turismoId } = useParams();
    return (
      <>
        <Box sx={sxStyle}>

          <h1>TurismoPlace</h1>
          {CoffeeDivider}
          <h2>{turismoId}</h2>
          <h2>{turismoPlaces.find((place) => place.id === Number(turismoId)).name}</h2>

          {turismoPlaces.find((place) => place.id === Number(turismoId)).description}

          <img
            src={turismoPlaces.find((place) => place.id === Number(turismoId)).image}
            alt={turismoPlaces.find((place) => place.id === Number(turismoId)).name}
          />
        </Box>
      </>
    );
  };

  const NotFound = () => {
    return (
      <Box sx={sxStyle}>
        <Typography variant="h1" sx={{
          my: "16px",
        }}>
          404 Not Found
        </Typography>
        {CoffeeDivider}
        <Typography variant="h2" sx={{
          my: "16px",
        }}>
          La página que buscas no existe
        </Typography>
      </Box>
    )
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
        currency: "USD",
        "merchant-id": "5GCDGVXR9ARUY",
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home CoffeeDivider={CoffeeDivider} />} />
            <Route path="/products" element={<Products formatter={formatter} />} />
            <Route path="/cart" element={<Cart fetchCart={fetchCart} formatter={formatter} CoffeeDivider={CoffeeDivider} />} />
            <Route path="/checkout" element={<Checkout formatter={formatter} CoffeeDivider={CoffeeDivider} />} />

            {/* testing dinamic routes */}

            <Route path="/turismo" element={<TurismoPage CoffeeDivider={CoffeeDivider} />} />
            <Route
              path="/turismo/:turismoId"
              element={<TurismoPlace CoffeeDivider={CoffeeDivider} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </PayPalScriptProvider>
  );
};


export default App;
