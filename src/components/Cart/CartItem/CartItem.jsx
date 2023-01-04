import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  stepContentClasses,
} from "@mui/material";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  removeItem,
  decrementQuantity,
  setConfirmed,
} from "../../../store";
import { useState, useEffect } from "react";

const CartItem = ({
  item,
  handleUpdateCartQty,
  handleRemoveFromCart,
  formatter,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const { products, confirmed } = useSelector((state) => state.cart);
  const product = products.filter((product) => product.id === item.id)[0];
  const quantity = product?.quantity;
  const lineTotal = product?.lineTotal;

  const remove = () => {
    setDisabled(true);
    handleRemoveFromCart(item.id);
    dispatch(removeItem(product));
  };

  useEffect(() => {
    if (quantity <= 0) {
      remove();
    }
  }, [quantity]);

  // when confirm button is clicked, update the quantity in the backend
  useEffect(() => {
    if (confirmed) {
      handleUpdateCartQty(item.id, quantity);
      dispatch(setConfirmed(false));
      console.log(item);
    }
  }, [confirmed]);

  return (
    <Card>
      <CardMedia
        image={item.image.url}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">{formatter.format(lineTotal)}</Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => {
              dispatch(decrementQuantity(product));
            }}
            disabled={disabled}
          >
            -
          </Button>
          <Typography>{quantity} </Typography>
          <Button
            type="button"
            size="small"
            onClick={() => {
              dispatch(incrementQuantity(product));
            }}
            disabled={disabled}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={remove}
          disabled={disabled}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
