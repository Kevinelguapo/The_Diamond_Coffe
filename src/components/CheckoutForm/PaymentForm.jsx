import React from "react";
import { Typography, Button, Divider } from "@mui/material";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {} from "../../store";

import Review from "./Review";

const PaymentForm = ({ shippingData, checkoutToken, backStep }) => {
  const dispatch = useDispatch();
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState("");

  const handleApprove = (orderId) => {
    setPaidFor(true);
    setOrderId(orderId);
  };
  if (paidFor) {
    alert("Thank you for your purchase! ");
    // dispatch(clearCart());
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          Thank you for your purchase!
        </Typography>
        <Divider />
        <Typography variant="subtitle2">Order ref: {orderId}</Typography>
      </div>
    );
  }
  if (error) {
    alert(error);
  }
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment Method
      </Typography>
      <PayPalScriptProvider>
        <PayPalButtons
          // style={{ layout: "horizontal" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: 0.05,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            console.log("order ", order);
            handleApprove(data.orderID);
          }}
          onCancel={() => {}}
          onError={(error) => {
            setError(error);
            console.log("PayPal Checkout onError", error);
          }}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default PaymentForm;
