import React from "react";
import { Typography, Button, Divider } from "@mui/material";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import Review from "./Review";

const PaymentForm = ({ shippingData, checkoutToken, backStep }) => {
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment Method
      </Typography>
    </>
  );
};

export default PaymentForm;
