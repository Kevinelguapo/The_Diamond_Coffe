import React from "react";
import { commerce } from "../../lib/commerce";
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
import { setConfirmed, setCart, setEmptyCart } from "../../store";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BorderLinearProgress = (props) => (
  <LinearProgress
    {...props}
    sx={{
      height: 10,
      borderRadius: 5,
      [`&.${linearProgressClasses.colorPrimary}`]: {
        borderRadius: 5,
        backgroundColor: "inherit",
        border: "1px solid #e0e0e0",
      },
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: "primary.light",
      },
    }}
  />
);

const Cart = () => {
  const { subtotal, total_items, line_items } = useSelector(
    (state) => state.cart.cart
  );
  let subTotal = subtotal.raw;

  const { isLoadingProduct, isLoadingCart, confirmed } = useSelector(
    (state) => state.cart
  );

  const houndredPercent = 100000;
  const [subTotalPercentage, setSubTotalPercentage] = useState(
    (subTotal * 100) / houndredPercent
  );
  const [remaining, setRemaining] = useState(houndredPercent - subTotal);
  const [confirmedIsLoading, setConfirmedIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmptyCart = async () => {
    dispatch(setEmptyCart());
    await commerce.cart.empty();
  };

  useEffect(() => {
    let percentage = (subTotal * 100) / houndredPercent;
    setSubTotalPercentage(percentage > 100 ? 100 : percentage);
    let remaining = houndredPercent - subTotal;
    setRemaining(remaining < 0 ? 0 : remaining);
  }, [subTotal]);

  useEffect(() => {
    if (total_items === 0) {
      //handleEmptyCart();
      // dispatch line_items to empty array
    }
  }, [total_items]);

  const EmptyCart = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        minHeight: "calc(100vh - 160px)",
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
      <Box
        sx={{
          padding: "80px 0 120px",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            top: "80px",
            bottom: "auto",
            padding: "10px 16px 16px",
            bgcolor: "background.appBar2",
            color: "white",
          }}
        >
          <Typography variant="subtitle2" textAlign={"center"}>
            {subTotalPercentage === 100
              ? "Env??o Gratis!"
              : `Solo te faltan ${formatter.format(
                  remaining
                )} para el env??o Gratis!`}
          </Typography>

          <BorderLinearProgress
            variant="determinate"
            value={subTotalPercentage}
          />
        </AppBar>
        <Grid
          container
          spacing={2}
          sx={{
            overflowY: "auto",
          }}
        >
          {line_items.map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              <CartItem
                item={item}
                formatter={formatter}
                handleEmptyCart={handleEmptyCart}
              />
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ margin: "20px 0" }} />
        <Typography variant="h6" textAlign="center">
          ??Quieres comprar m??s productos?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/products")}
          sx={{ marginTop: "10px", width: "100%" }}
        >
          Ir a la tienda
        </Button>
        <Divider sx={{ margin: "20px 0" }} />
        <Typography variant="h6" textAlign="center">
          ??Quieres vaciar tu carrito?
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEmptyCart}
          sx={{ marginTop: "10px", width: "100%" }}
        >
          Vaciar carrito
        </Button>
      </Box>
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          padding: "0  16px",
          bgcolor: "background.appBar",
          color: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            margin: "16px 0 10px",
          }}
        >
          <Typography variant="h6">SUBTOTAL:</Typography>
          <Typography variant="h5">{formatter.format(subTotal)}</Typography>
        </Box>
        <Button
          size="medium"
          type="button"
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(setConfirmed(true));
            setConfirmedIsLoading(true);
          }}
          sx={{ width: "100%", marginBottom: "16px" }}
          disabled={confirmedIsLoading}
        >
          Comprar ahora <ShoppingCartCheckoutIcon />
        </Button>
      </AppBar>
      {/* {cart.line_items.length !== products.length && fetchData()} */}
    </>
  );

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

  return (
    <>
      {!isLoadingProduct && !isLoadingCart ? (
        <Container
          sx={{
            padding: "80px 10px 0",
            bgcolor: "background.paper",
            minHeight: "100vh",
          }}
        >
          {total_items === 0 ? <EmptyCart /> : <FilledCart />}
        </Container>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <CircularProgress color="primary" size={100} />
        </Box>
      )}
    </>
  );
};

export default Cart;
