import React from "react";
import { TextField, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const FormInput = ({control, name, label, required }) => {

  const handleChange = (event) => {
    return event.target.value;
  };

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            id={name}
            label={label}
            required={required}
            autoComplete={`given-${name}`}
            fullWidth
            onChange={(event) => field.onChange(handleChange(event))}
          />
        )}
      />
      {/* <TextField
        required
        id={name}
        name={name}
        label={name.charAt(0).toUpperCase() + name.slice(1)}
        fullWidth
        autoComplete={`given-${name}`}
        variant="outlined"
        onChange={handleInputChange}
      /> */}
    </Grid>
  );
};

export default FormInput;
