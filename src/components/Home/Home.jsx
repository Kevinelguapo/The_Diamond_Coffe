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
import HomeImages from "./HomeImages";
import { Contact } from "./Contact";


const Home = () => {
  
  const [activeStep, setActiveStep] = React.useState(0);

  let videos = [
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
  ];

  const maxSteps = videos.length;


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
    border: "2px solid",
    borderColor: "background.cart",
    borderRadius: "8px",
    boxSizing: "border-box",
    padding: "8px",
    bgcolor: "background.paper",
  }

  return (

    <Box
      sx={{
        padding: "80px 0 16px",
        bgcolor: "background.default"
      }}
    >
      <YoutubeVideo embedId={videos[activeStep].embedId} />
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
        sx={{
          bgcolor: "background.default",
        }}
      />
      <Divider sx={{ margin: "8px 8px 16px" }} />
      <Box sx={{ padding: "0 16px" }} >
        <Typography variant="h2" component="h1" align="center">
          Sobre Nosotros
        </Typography>
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          margin: "16px 0",
          gap: "16px",

        }}>
          <Paper sx={{
            ...aboutUsSx,
            padding: "16px",
            width: {...aboutUsSx.width, md: 350,},
          }}>

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
        <Divider sx={{ margin: "16px 8px" }} />
        <Contact />
      </Box>
    </Box>
  );
};

export default Home;
