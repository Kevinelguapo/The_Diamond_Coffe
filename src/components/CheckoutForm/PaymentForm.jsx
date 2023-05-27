import React from "react";
import { Typography, Button, Divider, Box } from "@mui/material";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { } from "../../store";
import md5 from "md5";
import PaymentIcon from '@mui/icons-material/Payment';


import Review from "./Review";

const PaymentForm = ({ shippingData, checkoutToken, formatter }) => {
  const dispatch = useDispatch();
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState("");



  const generateSignature = () => {
    console.log(process.env.REACT_APP_PAYU_API_KEY)
    const signatureBase = [
      process.env.REACT_APP_PAYU_API_KEY,
      process.env.REACT_APP_PAYU_MERCHANT_ID,
      // "4Vj8eK4rloUd272L48hsrarnUA",
      // "508029",
      checkoutToken.id,
      // checkoutToken.total.raw,
      "2000",
      "COP",
    ].join("~");

    return md5(signatureBase);
  };

  const order = {
    merchantId: process.env.REACT_APP_PAYU_MERCHANT_ID,
    accountId: process.env.REACT_APP_PAYU_ACCOUNT_ID,
    // merchantId: "508029",
    // accountId: "512321",
    description: "Compra en DonBoliCoffee",
    referenceCode: checkoutToken.id,
    // amount: checkoutToken.total.raw,
    amount: "2000",
    tax: "0",
    taxReturnBase: "0",
    currency: checkoutToken.currency.code,
    signature: generateSignature(),
    buyerEmail: shippingData.email,
    // telephone: shippingData.phone,
    buyerFullName: shippingData.firstName + " " + shippingData.lastName,
    // payerEmail: shippingData.email,
    // payerPhone: shippingData.phone,
    // payerFullName: shippingData.firstName + " " + shippingData.lastName,
    // payerDocument: shippingData.document,
    // payerDocumentType: shippingData.documentType,
    // responseUrl: "http://localhost:3000/turismo",
    // confirmationUrl: "http://localhost:3000/cart",
    // shippingAddress: shippingData.address,
    // shippingCity: shippingData.city,
    // shippingCountry: shippingData.shippingCountry,
  };


  const handleSubmit = () => {
    // Create the form
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/";
    //form.action = process.env.REACT_APP_PAYU_URL; 

    // Add the form data
    Object.keys(order).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = order[key];
      form.appendChild(input);
    });

    // Add the form to the page and submit it
    document.body.appendChild(form);
    form.submit();

  };


  const handleApprove = (orderId) => {
    // call the backend function to fulfill the order
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
      <Review checkoutToken={checkoutToken} formatter={formatter} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Método de pago
      </Typography>
      {/* button to pay with payU */}
      <Button
        size="large"
        variant="contained"
        color="primary"
        sx={{ width: "100%", padding: "10px 0", textTransform: "none" }}
        onClick={handleSubmit}

      >
        <PaymentIcon sx={{ mr: 1 }} />
        <Typography variant="h6" style={{ margin: "0 0" }}>
          PayU
        </Typography>
      </Button>

      <Divider sx={{
        mt: 3,
        mb: 3,
      }} />

      {/* button to pay with paypal */}

      <Box sx={{
        bgcolor: 'background.white',
        padding: "10px",
        borderRadius: "5px",
      }} >

        <PayPalButtons
          // style={{ layout: "horizontal" }}
          style={{
            color: "blue",
          }}
          onClick={(data, actions) => {
            const hasAlreadyBought = false;
            if (hasAlreadyBought) {
              alert("You have already bought this item!");
              setError("You have already bought this item!");
              return actions.reject();
            }
            else {
              return actions.resolve();
            }
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: order.description,
                  amount: {
                    currency_code: "USD",
                    value: 0.01,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            const name = order.payer.name.given_name;
            handleApprove(data.orderID);

            console.log("PayPal Checkout onApprove", order);
            // OPTIONAL: Call your server to save the transaction
            // return fetch("/paypal-transaction-complete", {
            //   method: "post",
            //   body: JSON.stringify({
            //     orderID: data.orderID,
            //   }),
            // });
          }
          }
          onCancel={() => { }}
          onError={(error) => {
            setError(error);
            console.log("PayPal Checkout onError", error);
          }}
        />

      </Box>
    </>
  );
};

export default PaymentForm;
