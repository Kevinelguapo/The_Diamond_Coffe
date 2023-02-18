import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );
  const options = shippingOptions.map((option) => ({
    id: option.id,
    label: `${option.description} - ${option.price.formatted_with_code}`,
  }));

  console.log(shippingOptions);

  const { register, handleSubmit } = useForm();

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  const submit = (data) => {
    console.log({
      ...data,
      shippingCountry,
      shippingSubdivision,
      shippingOption,
    });
    next({ ...data, shippingCountry, shippingSubdivision, shippingOption });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom align="center">
        Shipping Address
      </Typography>
      <br />

      <form align="center" onSubmit={handleSubmit(submit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <input
              type="text"
              {...register("name")}
              required
              placeholder="First Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              type="text"
              {...register("lastName")}
              placeholder="Last Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input type="email" {...register("email")} placeholder="Email" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input type="text" {...register("address")} placeholder="Address" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input type="text" {...register("city")} placeholder="City" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              type="number"
              {...register("zip")}
              placeholder="Zip / Postal Code"
            />
          </Grid>
          <Grid item xs={12} sm={12} gutterBottom></Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>
            <Select
              value={shippingCountry}
              fullWidth
              onChange={(e) => setShippingCountry(e.target.value)}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Subdivisions</InputLabel>
            <Select
              value={shippingSubdivision}
              fullWidth
              onChange={(e) => setShippingSubdivision(e.target.value)}
            >
              {subdivisions.map((subdivision) => (
                <MenuItem key={subdivision.id} value={subdivision.id}>
                  {subdivision.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Options</InputLabel>
            <Select
              value={shippingOption}
              fullWidth
              onChange={(e) => setShippingOption(e.target.value)}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <br />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button component={Link} to="/cart" variant="outlined">
            Back to Cart
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </div>
      </form>

      {/* <FormProvider {...methods}>
        <form onSubmit=''>
          <Grid container spacing={3}>
            <FormInput name='firstName' required='required' label='First Name' />
            <FormInput name='lastName' required='required' label='Last Name' />
            <FormInput name='email' required='required' label='Email' />
            <FormInput name='address' required='required' label='Address' />
            <FormInput name='city' required='required' label='City' />
            <FormInput name='zip'  label='ZIP / Postal Code' />

          </Grid>
        </form>
      </FormProvider> */}
    </>
  );
};

export default AddressForm;
