import React from "react";
import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        marginTop: "80px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1">Home</Typography>
    </Box>
  );
};

export default Home;
