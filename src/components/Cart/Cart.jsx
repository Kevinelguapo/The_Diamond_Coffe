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
import { Stack } from "@mui/system";
import { Dialog, Skeleton, } from "@mui/material";
import { PropaneTankSharp } from "@mui/icons-material";
import CoffeeIcon from '@mui/icons-material/Coffee';

const BorderLinearProgress = (props) => (
  // the previous props was {...props}
  <LinearProgress variant="determinate" {...props}
    sx={{
      margin: "8px",
      height: 10,
      borderRadius: 5,
      [`&.${linearProgressClasses.colorPrimary}`]: {
        borderRadius: 5,
        backgroundColor: "inherit",
        border: "1px solid",
        borderColor: {
          xs: "white",
          lg: "#e0e0e0",
        }
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

  function defaultBarSx(bgColor) {
    return {
      position: "fixed",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "8px 16px",
      boxSizing: "border-box",
      border: "none",
      width: "100%",
      bgcolor: {
        xs: bgColor,
        // lg: "background.paper",
      },
      color: {
        xs: "white",
        // lg: "black",
      },
      margin: "0 auto",
      maxWidth: "1196px",
      zIndex: 1,
      borderTop: {
        xs: "none",
        lg: "2px solid",
      },
      borderBottom: {
        xs: "none",
        lg: "2px solid",
      },
      borderColor: {
        xs: "none",
        lg: "border.grey",
      }
    };
  }

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


  const EmptyCart = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
        height: "100vh",
      }}
    >
      <Typography gutterBottom variant="h5" align="center" >
        NO HAY PRODUCTOS EN TU CARRITO!
      </Typography>
      <Typography gutterBottom variant="h6" align="center" >
        Agrega productos a tu carrito para comprar
      </Typography>
      <br/>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/products")}
        sx={{ marginTop: "10px", width: "100%", maxWidth: "500px" }}
      >
        Ir a la tienda
        <ShoppingCartCheckoutIcon sx={{ marginLeft: "10px" }} />
      </Button>
    </Box>
  );
  const FilledCart = () => (
    <>
      <Box >
        <Box sx={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0, 
          left: 0,
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: confirmed ? "flex" : "none",
          transition: 'all 0.5s ease-in-out',
          alignItems: 'center',
          justifyContent: 'center',
        }} >
        <CircularProgress size={100}/>
        </Box>
        {/* Add the progressive bar here */}
        <Box sx={{
          ...defaultBarSx("background.appBar2"),
          top: "80px",
        }} >
          <Typography variant="subtitle2" textAlign={"center"} gutterBottom>
            {subTotalPercentage === 100
              ? "Envío Gratis!"
              : `Solo te faltan ${formatter.format(
                remaining
              )} para el envío Gratis!`}
          </Typography>
          <BorderLinearProgress value={subTotalPercentage} />
        </Box>
        <Grid
          container
          spacing={2}
          sx={{overflowY: "auto"}} >
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
        {CoffeeDivider}
        <Typography variant="h6" textAlign="center">
          ¿Quieres comprar más productos?
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => navigate("/products")}
          sx={{ marginTop: "10px", width: "100%" }}
        >
          Ir a la tienda
        </Button>
        <br /> 
        <br />

        <Typography variant="h6" textAlign="center">
          ¿Quieres vaciar tu carrito?
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={handleEmptyCart}
          sx={{ marginTop: "10px", width: "100%" }}
        >
          Vaciar carrito
        </Button>
      </Box>
      <Box sx={{
        ...defaultBarSx("background.appBar2"),
        bottom: 0,
        top: "auto",
      }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            margin: "10px 0 ",
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
          }}
          sx={{ width: "100%", marginBottom: "10px"}}
          disabled={confirmed}
        >
          Comprar ahora <ShoppingCartCheckoutIcon />
        </Button>
      </Box>
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
            position: "relative",
            top: "0px",
            padding: total_items ? "160px 8px 150px " : "0px 0px 0px",
            bgcolor: total_items ? "background.default" : "none",
            border: {
              xs: "none",
              lg: total_items ? "2px solid" : "none",
            },
            borderColor: {
              lg: "border.darkGrey"
            },
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
