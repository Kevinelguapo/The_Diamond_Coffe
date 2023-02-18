import React from "react";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  IconButton,
  Box,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantity,
  removeItem,
  setConfirmed,
  setCart,
} from "../../../store";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { commerce } from "../../../lib/commerce";
import { useNavigate } from "react-router-dom";

const spacedRowSx = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

const CartItem = ({ item, formatter, handleEmptyCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { total_items } = useSelector((state) => state.cart.cart);
  const { confirmed } = useSelector((state) => state.cart);

  const handleRemoveFromCart = async (productId) => {
    try {
      await commerce.cart.remove(productId);
      console.log("removed");
    } catch (error) {
      console.log(error);
    }
  };

  const remove = () => {
    if (total_items === item.quantity) handleEmptyCart();
    else {
      dispatch(removeItem(item));
      handleRemoveFromCart(item.id);
    }
  };

  const handleAdd = () => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleSubtract = () => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  };

  // when confirm button is clicked, update the quantity in the backend

  const handleUpdateCartQty = async (productId, quantity) => {
    const newCart = await commerce.cart.update(productId, {
      quantity: quantity,
    });
    dispatch(setCart(newCart));
    console.log("updated");
    navigate("/checkout");
  };

  useEffect(() => {
    if (confirmed) {
      handleUpdateCartQty(item.id, item.quantity);
      dispatch(setConfirmed(false));
      console.log(item);
    }
  }, [confirmed]);

  return (
    <Card
      sx={{
        ...spacedRowSx,
        "@media (max-width: 300px)": {
          flexDirection: "column",
          p: "16px 0",
        },
        p: "0",
        m: "0",
        bgcolor: "background.default",
        minHeight: "136.62px",
      }}
    >
      <CardMedia
        component="img"
        image={item.image.url}
        alt={item.name}
        // height="100"
        sx={{
          padding: "0 0 0 16px",
          "@media (max-width: 300px)": {
            padding: "0 16px 16px",
          },
          objectFit: "contain",
          width: { xs: 80, sm: 100, md: 120, lg: 120, xl: 120 },
          height: { xs: 80, sm: 100, md: 120, lg: 120, xl: 120 },
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ padding: "16px 16px 8px" }}>
          <Box sx={spacedRowSx}>
            <Typography variant="h6" component="div">
              {item.name}
            </Typography>
            <Typography variant="subtitle1">
              {formatter.format(item.line_total.raw)}
            </Typography>
          </Box>
          <Box sx={{ ...spacedRowSx, justifyContent: "left" }}>
            {item.selected_options.map((option, idx, arr) => {
              return (
                <Typography
                  key={option.group_id}
                  variant="subtitle2"
                  component="div"
                  sx={{ ml: "5px" }}
                >
                  {option.option_name} {idx === arr.length - 1 ? "" : "/"}
                </Typography>
              );
            })}
          </Box>
        </CardContent>
        <Divider sx={{ width: "90%", margin: "0 auto 0px" }} />
        <CardActions
          sx={{
            ...spacedRowSx,
            padding: "8px 16px 16px",
            overflowX: "auto",
          }}
        >
          <Box sx={spacedRowSx}>
            <IconButton
              size="small"
              disabled={item.quantity <= 1}
              onClick={handleSubtract}
            >
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ padding: "0 16px" }}>{item.quantity} </Typography>
            <IconButton size="small" onClick={handleAdd}>
              <AddIcon />
            </IconButton>
          </Box>
          <Tooltip title="Eliminar">
            <IconButton sx={{ padding: 0 }} onClick={remove}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Box>
    </Card>
  );
};

export default CartItem;
