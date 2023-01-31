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
  CardHeader,
} from "@mui/material";
import {
  AddShoppingCart,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { incrementItem } from "../../../store";
import { useDispatch } from "react-redux";
import { commerce } from "../../../lib/commerce";
import { useState, useEffect } from "react";

const Product = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();
  const [retrivedProduct, setRetrivedProduct] = useState({});
  const [variants, setVariants] = useState([]);
  const [variantData, setVariantData] = useState({});
  const [sizeOption, setSizeOption] = useState({});
  const [typeOption, setTypeOption] = useState({});
  const [totalPrice, setTotalPrice] = useState(product.price.raw);
  const [expanded, setExpanded] = useState(false);
  const [limit, setLimit] = useState(2);
  const [images, setImages] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleChangeDescription = () => {
    setExpanded(!expanded);
  };

  const fetchProduct = async () => {
    let prod = await commerce.products.retrieve(product.id);
    setRetrivedProduct(prod);
    setVariants(prod.variant_groups);
    setSizeOption(prod.variant_groups[0]?.options[0]);
    setTypeOption(prod.variant_groups[1]?.options[0]);
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
    } else {
      setLimit(2);
    }
  }, [expanded]);

  useEffect(() => {
    if (variants.length > 0) {
      setVariantData({
        [variants[0]?.id]: sizeOption?.id,
        [variants[1]?.id]: typeOption?.id,
      });

      setTotalPrice(
        product.price.raw + sizeOption?.price.raw + typeOption?.price.raw
      );
    }
  }, [sizeOption, typeOption]);

  const handleAddToCart = () => {
    dispatch(incrementItem());
    onAddToCart(product.id, 1, variantData);
    console.log("retrivedProduct", retrivedProduct);

    console.log("images", images);
  };

  const handleSizeChange = (e) => {
    variants[0].options.forEach((option) => {
      if (option.name === e.target.value) {
        setSizeOption(option);
      }
    });
  };

  const handleTypeChange = (e) => {
    variants[1].options.forEach((option) => {
      if (option.name === e.target.value) {
        setTypeOption(option);
      }
    });
  };

  if (images.length === 0) {
    return (
      <Card>
        <Skeleton variant="rectangular" height={200} animation="wave" />
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
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
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-betwen",
          }}
        >
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
    );
  }

  return (
    <Card sx={{ backgroundColor: "white" }}>
      <Box>
        <CardMedia
          component="img"
          image={images[activeStep].url}
          alt={images[activeStep].name}
          height="250"
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            //margin: "10px 0 -16px 0",
          }}
        >
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6">{formatter.format(totalPrice)}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
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

      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {variants?.map((variant) => {
            return (
              <FormControl
                key={variant.id}
                sx={{ m: 1, minWidth: 120 }}
                size="small"
              >
                <InputLabel sx={{ zIndex: 0 }} id="demo-select-small">
                  {variant.name}
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={
                    variant.name === "Tamaño"
                      ? sizeOption.name
                      : typeOption.name
                  }
                  label={variant.name}
                  onChange={
                    variant.name === "Tamaño"
                      ? handleSizeChange
                      : handleTypeChange
                  }
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
        <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
          <AddShoppingCart sx={{ color: "black" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default Product;
