import React from "react";
import { Typography, Button, Grid, Container } from "@mui/material";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartProducts, setConfirmed } from "../../store";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({
  cart,
  fetchCart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();
  const { totalItems, subTotal, confirmed } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const setEmptyCart = () => {
    handleEmptyCart();
    dispatch(setCartProducts([]));
  };
  const EmptyCart = () => (
    <Typography variant="subtitle1">
      No tienes ningún producto en el carrito,
      <Link to={"/products"}> Empieza a agregar algunos</Link>!
    </Typography>
  );
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <CartItem
              item={item}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              formatter={formatter}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {formatter.format(subTotal)}{" "}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={setEmptyCart}
          >
            Vaciar Carrito
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(setConfirmed(true));
              setTimeout(() => {
                console.log(cart);
                navigate("/checkout");
              }, 1000);
            }}
          >
            Confirmar
          </Button>
        </div>
      </div>
      {/* {cart.line_items.length !== products.length && fetchData()} */}
    </>
  );
  if (!cart.line_items) return "Loading...";

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Tu carrito de compras
      </Typography>
      {totalItems === 0 ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
