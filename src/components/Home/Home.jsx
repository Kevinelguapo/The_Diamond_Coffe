import React from "react";
import YoutubeVideo from "./YoutubeVideo";
import {
  Typography,
  Box,
  Divider,
  MobileStepper,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
//import video3 from "../../assets/videos/DJI_0210.MP4";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import CoffeeIcon from '@mui/icons-material/Coffee';

import HomeImages from "./HomeImages";
import { Contact } from "./Contact";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

  let embededVideos = [
    {
      id: 1,
      title: "Video 1",
      embedId: "ULjPSCGooy4",
      //url: video1,
    },
    {
      id: 2,
      title: "Video 3",
      embedId: "teVxpgm74Uw",
      //url: video3,
    },
    {
      id: 3,
      title: "Video 2",
      embedId: "wKI-ngRQJ90",
      //url: video2,
    },
  ];

  const maxSteps = embededVideos.length;


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const aboutUsSx = {
    maxWidth: {
      xs: 450,
      md: 600,
    },
    width: "100%",
    height: {
      xs: "100%",
      md: 450,
    },
    border: "1px solid",
    borderColor: "border.grey",
    borderRadius: "8px",
    boxSizing: "border-box",
    padding: "8px",
    bgcolor: "background.paper",
  }

  const CoffeeDivider = (
    <Box sx={{
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "16px",
      my: "16px",
    }}>
      <Divider
        sx={{
          width: "30%",
          height: "1px",
          bgcolor: "divider.coffee",
          my: "16px",
        }}
      />
      <CoffeeIcon sx={{
        color: "divider.coffee",
      }} />
      <Divider
        sx={{
          width: "30%",
          height: "1px",
          bgcolor: "divider.coffee",
          my: "16px",
        }}
      />
    </Box>
  )

  const BgVideo = (
    <Box sx={{
      width: "100%",
      height: "calc(100vh - 80px)",
      position: "relative",
    }} >

      <video 
        autoPlay
        loop
        muted
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
        }}
        src={"https://diamondcoffeevideos.s3.us-east-2.amazonaws.com/backgrounds/DJI_0206.MP4"}
      />

      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        textAlign: "center",
        color: "text.white",
        bgcolor: "rgba(0,0,0,0.4)",
        width: "100%",
        height: "100%",
        padding: "16px",
        boxSizing: "border-box",
      }} >
        <Typography variant="h2" component="h1" align="center">
          WELLCOME TO
        </Typography>
        <Typography variant="h1" component="h1" align="center">
          DIAMOND COFFEE
        </Typography>
      </Box>

    </Box>
  )

  return (
    <Box
      sx={{
        padding: "80px 0 0",
        bgcolor: "background.default",
        color: "text.white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* add a bg video here */}
      {BgVideo}
      <Contact />
      {CoffeeDivider}

      {/* <Button variant="contained" onClick={
        () => navigate("/products")
      } >
        <Typography variant="h5" component="h1" align="center">
          Nuestros Productos
        </Typography>
      </Button> */}

      <Typography variant="h2" component="h1" align="center" sx={{ mb: "16px" }}>
        Sobre Nosotros
      </Typography>

      <YoutubeVideo embedId={embededVideos[activeStep].embedId} />
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <IconButton
            size="medium"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            <KeyboardArrowRight />
          </IconButton>
        }
        backButton={
          <IconButton
            size="medium"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            <KeyboardArrowLeft />
          </IconButton>
        }
        sx={{
          bgcolor: "inherit",
          width: "100%",
          mb: "16px",
          boxSizing: "border-box",
          "& .MuiMobileStepper-dotActive": {
            backgroundColor: "action.active",
          }
        }}
      />

      <Box sx={{ padding: "0 16px" }} >
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          margin: "16px 0 0",
          gap: "16px",

        }}>
          <Paper sx={{
            ...aboutUsSx,
            padding: "16px",
            width: { ...aboutUsSx.width, md: 350, },
          }}>
            <Typography variant="h4" component="h1" align="center">
              Nuestra Historia
            </Typography>
            <Divider sx={{ m: "16px", bgcolor: "border.grey" }} />


            <Typography variant="body2" align="center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptates, quod, quia, voluptate quae voluptatem quibusdam quos
              voluptatum quas natus quidem. Quisquam, quae. Quisquam, quae. Quisquam,
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptates, quod, quia, voluptate quae voluptatem quibusdam quos
              voluptatum quas natus quidem. Quisquam, quae. Quisquam, quae. Quisquam,
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptates, quod, quia, voluptate quae voluptatem quibusdam quos
              voluptatum quas natus quidem. Quisquam, quae. Quisquam, quae. Quisquam,
            </Typography>
          </Paper>
          <HomeImages aboutUsSx={aboutUsSx} />
        </Box>
      </Box>
      {CoffeeDivider}
      <Box sx={{ textAlign: 'center', bgcolor: 'background.darkPaper', py: 3, width: "100vw" }}>
        <Typography variant="body2" color="inherit">
          © {new Date().getFullYear()} Coffee The Diamond Don Boli. All rights reserved.
        </Typography>
      </Box>
    </Box>

  );
};

export default Home;
