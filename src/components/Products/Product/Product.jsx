import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  MobileStepper,
  Skeleton,
} from "@mui/material";
import {
  AddShoppingCart,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { incrementItem, setCart, setLoadingProduct } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { commerce } from "../../../lib/commerce";
import { useState, useEffect } from "react";

const Product = ({ product }) => {
  const [variants, setVariants] = useState([]);
  const [variantData, setVariantData] = useState({});
  const [options, setOptions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(product.price.raw);
  const [expanded, setExpanded] = useState(false);
  const [limit, setLimit] = useState(2);
  const [images, setImages] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const dispatch = useDispatch();
  const { isLoadingProduct } = useSelector((state) => state.cart);

  const onAddToCart = async (productId, quantity, variantData) => {
    const cart = await commerce.cart.add(productId, quantity, variantData);
    dispatch(setCart(cart));
    dispatch(setLoadingProduct(false));
  };

  const handleAddToCart = () => {
    dispatch(incrementItem());
    dispatch(setLoadingProduct(true));
    onAddToCart(product.id, 1, variantData);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeDescription = () => {
    setExpanded(!expanded);
  };

  const fetchProduct = async () => {
    let prod = await commerce.products.retrieve(product.id);
    setVariants(prod.variant_groups);
    //console.log("variants", prod.name, prod.variant_groups);
    prod.variant_groups.forEach((variant) => {
      setOptions((current) => [...current, variant?.options[0]]);
    });
    setImages(
      prod.assets.map((asset) => {
        return { url: asset.url, name: asset.filename };
      })
    );
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (expanded) {
      setLimit(100);
      console.log("options", options);
    } else {
      setLimit(2);
    }
  }, [expanded]);

  useEffect(() => {
    if (variants.length > 0) {
      setVariantData(
        variants.reduce((acc, variant, idx) => {
          acc[variant.id] = options[idx].id;
          return acc;
        }, {})
      );

      let price = product.price.raw;
      options.reduce((acc, option) => {
        price += option.price.raw;
        return acc;
      }, 0);
      setTotalPrice(price);
    }
  }, [options]);

  const handleChange = (event, idx) => {
    variants[idx].options.forEach((option) => {
      if (option.name === event.target.value) {
        setOptions((current) => {
          let newOptions = [...current];
          newOptions[idx] = option;
          return newOptions;
        });
      }
    });
  };

  const rowStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <>
      {" "}
      {images.length ? (
        <Card sx={{ backgroundColor: "white" }}>
          <Box>
            <CardMedia
              component="img"
              image={images[activeStep].url}
              alt={images[activeStep].name}
              height="200"
              sx={{ objectFit: "contain" }}
            />
            <MobileStepper
              variant="dots"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <IconButton
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  <KeyboardArrowRight />
                </IconButton>
              }
              backButton={
                <IconButton
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  <KeyboardArrowLeft />
                </IconButton>
              }
            />
          </Box>

          <CardContent sx={{ padding: "0 16px 10px" }}>
            <Box sx={rowStyle}>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h6">
                {formatter.format(totalPrice)}
              </Typography>
            </Box>
            <Box sx={rowStyle}>
              <Typography
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: limit,
                  WebkitBoxOrient: "vertical",
                  overflow: " hidden",
                  textOverflow: "ellipsis",
                }}
                dangerouslySetInnerHTML={{ __html: product.description }}
                variant="body2"
                color="textSecondary"
              />
              <IconButton
                onClick={handleChangeDescription}
                sx={{
                  height: "50px",
                  width: "50px",
                  margin: "auto 0",
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease-in-out",
                }}
              >
                <ExpandMoreIcon sx={{ color: "black" }} />
              </IconButton>
            </Box>
          </CardContent>

          <CardActions disableSpacing sx={rowStyle}>
            <Box>
              {variants?.map((variant, idx) => {
                return (
                  <FormControl key={variant.id} sx={{ m: 1 }} size="small">
                    <InputLabel sx={{ zIndex: 0 }} id="demo-select-small">
                      {variant.name}
                    </InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={options[idx]?.name}
                      label={variant.name}
                      onChange={(e) => handleChange(e, idx)}
                    >
                      {variant.options.map((option) => {
                        return (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                );
              })}
            </Box>
            <IconButton
              aria-label="Add to Cart"
              disabled={isLoadingProduct}
              onClick={handleAddToCart}
            >
              <AddShoppingCart />
            </IconButton>
          </CardActions>
        </Card>
      ) : (
        <Card>
          <Skeleton variant="rectangular" height={200} animation="wave" />
          <CardActions disableSpacing sx={rowStyle}>
            <Skeleton
              animation="wave"
              width="50%"
              height={40}
              style={{ marginRight: 10 }}
            />
            <Skeleton
              animation="wave"
              width="30%"
              height={40}
              style={{ marginRight: 10 }}
            />
          </CardActions>
          <CardContent sx={{ padding: "0 16px" }}>
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </React.Fragment>
          </CardContent>
          <CardActions disableSpacing sx={rowStyle}>
            <Box sx={{ display: "flex", flexDirection: "row", width: "85%" }}>
              <Skeleton
                animation="wave"
                width="40%"
                height={40}
                style={{ marginRight: 10 }}
              />
              <Skeleton animation="wave" width="40%" height={40} />
            </Box>
            <Skeleton
              variant="circular"
              animation="wave"
              width={30}
              height={30}
              //style={{ marginRight: 10 }}
            />
          </CardActions>
        </Card>
      )}
    </>
  );
};

const formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default Product;
