import {
  Grid,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Product from "./Product/Product";
import { commerce } from "../.././lib/commerce";
import { useState, useEffect } from "react";

const Products = ({ products, onAddToCart }) => {
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState("All");

  const handleChange = (event) => {
    setCategorie(event.target.value);
  };

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();
    setCategories(data);
    //console.log("categories", data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (!products.length)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" size={100} />
      </Box>
    );
  return (
    <Box sx={{ flexGrow: 1, marginTop: "90px" }}>
      <Box
        sx={{
          position: "sticky",
          top: "90px",
          padding: "5px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          Button: {
            color: "black",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          },
          zIndex: 1,
        }}
      >
        <Button key={"all"} value="All" onClick={() => setCategorie("All")}>
          All
        </Button>
        {categories.map((categorie) => (
          <Button
            key={categorie.id}
            value={categorie.name}
            onClick={() => setCategorie(categorie.name)}
          >
            {categorie.name}
          </Button>
        ))}
      </Box>
      <Grid container spacing={4} sx={{ padding: "0 16px " }}>
        {products.map(
          (product) => {
            if (
              categorie === "All" ||
              categorie === product.categories[0].name
            ) {
              return (
                <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                  <Product product={product} onAddToCart={onAddToCart} />
                </Grid>
              );
            }
          }
          // <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
          // <Product product={product} onAddToCart={onAddToCart} />
          // </Grid>
        )}
      </Grid>
    </Box>
  );
};
export default Products;
