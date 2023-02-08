import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  IconButton,
  Box,
  Skeleton,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  removeItem,
  decrementQuantity,
  setConfirmed,
  setCartProducts,
} from "../../../store";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { commerce } from "../../../lib/commerce";

const spacedRowSx = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

const CartItem = ({
  item,
  handleUpdateCartQty,
  handleRemoveFromCart,
  formatter,
}) => {
  const dispatch = useDispatch();

  const { totalItems } = useSelector((state) => state.cart);

  const { products, confirmed } = useSelector((state) => state.cart);
  const product = products.filter((product) => product.id === item.id)[0];
  const quantity = product?.quantity;
  const lineTotal = product?.lineTotal;

  const remove = () => {
    if (totalItems === quantity) {
      dispatch(setCartProducts([]));
    } else {
      handleRemoveFromCart(item.id);
      dispatch(removeItem(product));
    }
  };

  // when confirm button is clicked, update the quantity in the backend
  useEffect(() => {
    if (confirmed) {
      handleUpdateCartQty(item.id, quantity);
      dispatch(setConfirmed(false));
      console.log(item);
    }
  }, [confirmed]);

  return (
    <>
      {product && (
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
                  {formatter.format(lineTotal)}
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
                  disabled={quantity <= 1}
                  onClick={() => {
                    dispatch(decrementQuantity(product));
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ padding: "0 16px" }}>{quantity} </Typography>
                <IconButton
                  size="small"
                  onClick={() => {
                    dispatch(incrementQuantity(product));
                  }}
                >
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
      )}
    </>
  );
};

export default CartItem;
