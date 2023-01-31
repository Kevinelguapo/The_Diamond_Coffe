import React from "react";
import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ marginTop: "100px" }}>
      <Typography
        variant="h1"
        sx={{
          display: "block",
          alignContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        Home
      </Typography>
    </Box>
  );
};

export default Home;
