import React from "react";
import {
  Typography,
  Button,
  Grid,
  Container,
  Box,
  CircularProgress,
  AppBar,
  Divider,
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CartItem from "./CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { setCartProducts, setConfirmed } from "../../store";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BorderLinearProgress = (props) => (
  <LinearProgress
    {...props}
    sx={{
      margin: "10px 0 16px",
      height: 10,
      borderRadius: 5,
      [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "primary.light",
      },
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: "secondary.main",
      },
    }}
  />
);

const Cart = ({
  cart,
  fetchCart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const BACKGROUND_COLOR = "#F8EDE3";
  const { totalItems, subTotal } = useSelector((state) => state.cart);

  const houndredPercent = 100000;
  const [subTotalPercentage, setSubTotalPercentage] = useState(
    (subTotal * 100) / houndredPercent
  );
  const [remaining, setRemaining] = useState(houndredPercent - subTotal);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    let percentage = (subTotal * 100) / houndredPercent;
    setSubTotalPercentage(percentage > 100 ? 100 : percentage);
    let remaining = houndredPercent - subTotal;
    setRemaining(remaining < 0 ? 0 : remaining);
  }, [subTotal]);

  useEffect(() => {
    if (totalItems === 0) {
      handleEmptyCart();
      dispatch(setCartProducts([]));
    }
  }, [totalItems]);

  const EmptyCart = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",

        padding: "20px",
      }}
    >
      <Typography gutterBottom pb={1} variant="h5">
        NO HAY PRODUCTOS EN TU CARRITO!
      </Typography>
      <Typography gutterBottom variant="h6">
        Agrega productos a tu carrito para comprar
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/products")}
        sx={{ marginTop: "10px", width: "100%" }}
      >
        Ir a la tienda
      </Button>
    </Box>
  );
  const FilledCart = () => (
    <>
      <Box>
        <Box
          sx={{
            position: "sticky",
            top: "90px",
            backgroundColor: BACKGROUND_COLOR,
            zIndex: 1,
            padding: "10px 0 0",
          }}
        >
          <Typography variant="subtitle1" textAlign={"center"}>
            {subTotalPercentage === 100
              ? "Envío Gratis!"
              : `Solo te faltan ${formatter.format(
                  remaining
                )} para tener envío Gratis!`}
          </Typography>

          <BorderLinearProgress
            variant="determinate"
            value={subTotalPercentage}
          />
        </Box>
        <Grid
          container
          spacing={3}
          sx={{
            overflowY: "auto",

            position: "relative",
            top: "10px",
          }}
        >
          {cart.line_items.map((item) => (
            <Grid item xs={12} key={item.id}>
              <CartItem
                item={item}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                formatter={formatter}
              />
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ margin: "20px 0" }} />
      </Box>
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          padding: "0  20px",
          backgroundColor: "black",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <Typography variant="h5">SUBTOTAL:</Typography>
          <Typography variant="h6">{formatter.format(subTotal)}</Typography>
        </Box>
        <Button
          size="large"
          type="button"
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(setConfirmed(true));
            console.log(cart);
            setTimeout(() => navigate("/checkout"), 1500);
          }}
          sx={{ width: "100%", marginBottom: "16px" }}
        >
          Comprar ahora <ShoppingCartCheckoutIcon />
        </Button>
      </AppBar>
      {/* {cart.line_items.length !== products.length && fetchData()} */}
    </>
  );
  if (!cart.line_items)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" size={100} />
      </Box>
    );

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

  return (
    <Container
      sx={{
        padding: "90px 16px 130px",
        backgroundColor: BACKGROUND_COLOR,
      }}
    >
      {totalItems === 0 ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
