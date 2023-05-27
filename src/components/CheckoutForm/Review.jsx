import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

const Review = ({ checkoutToken, formatter }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {checkoutToken.line_items.map((product) =>
        (
          <ListItem style={{ padding: "10px 0" }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <ListItemText  >
              {product.selected_options.map((option) => (
                <Typography key={option.group_id} variant="body2" color={"text.secondary"} >
                  {` ${option.option_name} `}
                </Typography>
              ))}

            </ListItemText>

            <Typography variant="body2">
              {formatter.format(product.line_total.raw)}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {`${formatter.format(checkoutToken.total.raw)} COP`}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
