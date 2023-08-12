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

  //console.log(shippingOptions);

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

  const { control, handleSubmit } = useForm();

  const submit = (data) => {
    next({ ...data, shippingCountry, shippingSubdivision, shippingOption });
  };

  return (
    <>
      <Typography variant="h5" align="center">
        Dirección de envío
      </Typography>
      <br />

      <form align="center" onSubmit={handleSubmit(submit)}>
        <Grid container spacing={3}>
          <FormInput control={control} name="firstName" label="Nombre" required={true} />
          <FormInput control={control} name="lastName" label="Apellido" required={false} />
          <FormInput control={control} name="email" label="Email" required />
          <FormInput control={control} name="address" label="Dirección" required />
          <FormInput control={control} name="city" label="Ciudad" required />
          {/* <FormInput control={control} name="zip" label="Zip / Postal Code" required={true} /> */}

          <Grid item xs={12} sm={6}>
            <InputLabel>País de envío</InputLabel>
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
            <InputLabel>Subdivisión</InputLabel>
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
            <InputLabel>Opciones de envío</InputLabel>
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
            Volver al carrito
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Siguiente
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddressForm;
