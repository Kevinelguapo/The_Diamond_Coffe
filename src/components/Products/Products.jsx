import { Grid, CircularProgress, Box, Button, AppBar } from "@mui/material";
import Product from "./Product/Product";
import { commerce } from "../.././lib/commerce";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState("All");
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();
    setCategories(data);
    //console.log("categories", data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <>
      {products.length ? (
        <>
          <AppBar
            position="fixed"
            sx={{
              top: "80px",
              bottom: "auto",
              bgcolor: "background.appBar2",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              Button: {
                m: "4px 16px",
                textAlign: "center",
                color: "white",
                "&:hover": {
                  bgcolor: "background.appBar",
                },
              },
              zIndex: 1,
              borderBottom: "1px solid #2C3639",
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
          </AppBar>

          <Grid
            container
            spacing={4}
            sx={{
              flexGrow: 1,
              padding: "138px 8px 16px",
              bgcolor: "background.paper",
            }}
          >
            {products.map((product) => (
              <React.Fragment key={product.id}>
                {categorie === "All" ||
                product.categories.filter((c) => c.name === categorie)
                  .length ? (
                  <Grid item xs={12} sm={6} md={4}>
                    <Product product={product} />
                  </Grid>
                ) : null}
              </React.Fragment>
            ))}
          </Grid>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <CircularProgress color="primary" size={100} />
        </Box>
      )}
    </>
  );
};
export default Products;
