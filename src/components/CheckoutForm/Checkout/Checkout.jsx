import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  Box,
  Container,
} from "@mui/material";

import CssBaseline from '@mui/material/CssBaseline';
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import FormSkeleton from "../FormSkeleton";
import { commerce } from "../../../lib/commerce";
import { useSelector } from "react-redux";

const steps = ["Shipping adress", "Payment details"];

const Checkout = ({formatter}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const { cart } = useSelector((state) => state.cart);

  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });
      setCheckoutToken(token);
      console.log("token", token);
    } catch (error) {
      console.log("Error generating token", error);
    }
  };

  useEffect(() => {
    generateToken();
  }, [cart]);

  const nextStep = () =>
    setActiveStep((prevActiveState) => prevActiveState + 1);
  const backStep = () =>
    setActiveStep((prevActiveState) => prevActiveState - 1);

  const next = (data) => {
    setShippingData(data);
    console.log("shippingData", data);
    nextStep();
  };

  const Confirmation = () =>
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Thank you for your order.
      </Typography>
      <Typography variant="subtitle1">
        Your order number is #2001539. We have emailed your order
        confirmation, and will send you an update when your order has
        shipped.
      </Typography>
    </React.Fragment>;

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm checkoutToken={checkoutToken} next={next} />;
      case 1:
        return <PaymentForm
          shippingData={shippingData}
          checkoutToken={checkoutToken}
          formatter={formatter}
          backStep={backStep}
        />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mt:"100px", mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }}}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} >
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel  >{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Confirmation />
        ) : (
          <>
            {checkoutToken ? getStepContent(activeStep) : <FormSkeleton />}
            <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
              {activeStep !== 0 && (
                <Button variant="outlined" onClick={backStep} sx={{ mt: 3, ml: 1 }} >
                  Back
                </Button>
              )}
              {activeStep == steps.length - 1 && 
              <Button variant="contained" onClick={nextStep} sx={{ mt: 3, ml: 1 }} >
                Place Order
              </Button>
              }
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Checkout;
