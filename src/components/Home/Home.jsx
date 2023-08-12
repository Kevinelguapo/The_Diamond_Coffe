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
  Stack,
} from "@mui/material";


import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";


import HomeImages from "./HomeImages";
import { Contact } from "./Contact";
import { useNavigate } from "react-router-dom";
import { CoffeeDivider } from "../../App";

const Home = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

  let embededVideos = [
    {
      id: 1,
      title: "Video 2",
      embedId: "xv3WBO1Ve48",
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

  const BgVideo = () => (
    <Box sx={{
      width: "100%",
      height: { xs: 'calc(50vh - 80px)', md: "calc(100vh - 200px)"},
      position: "relative",
      mb: 2,
    }} >

      <video
        autoPlay
        loop
        muted
        style={{
          objectFit: "cover",
          width: "100%",
          height: '100%',
          position: "absolute",
          top: 0,
          left: 0,
        }}
        src={"https://diamondcoffeevideos.s3.us-east-2.amazonaws.com/backgrounds/DJI_0206.MP4"}
      />
    </Box>
  )

  return (
    <Stack
      sx={{
        pb: "64px",
        bgcolor: "background.default",
        color: "text.white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BgVideo />
      <CoffeeDivider />
      <Contact />
      <Paper elevation={0} sx={{
        bgcolor: {
          xs: "background.default",
          md: "background.darkPaper"
        },
        padding: "0 0 16px",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        m: "0 0 16px 0 ",
        borderRadius: "10px",


      }} >
        <Typography variant="h3" align="center" sx={{ padding: {xs: "0 0 16px", md: "16px 0"} }}>
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
            bgcolor: "background.default",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",

            width: {
              xs: "100%",
              md: "70%",
            },
            boxSizing: "border-box",
            "& .MuiMobileStepper-dotActive": {
              backgroundColor: "action.active",
            }
          }}
        />
        <Divider sx={{m: 4, width: '80%'}} /> 

        <Box sx={{ padding: "0 16px" }} >
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
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
                La finca, anteriormente propiedad de generaciones pasadas, fue adquirida por la familia actual, quienes decidieron desarrollarla a través del cultivo del café y la construcción de diversas infraestructuras, como casas y un beneficiadero. En la actualidad, la finca alberga más de 50,000 árboles de café en plena producción. Inspirados por esta pasión cafetera, la familia decidió fundar la empresa "
                The Diamond Coffee Don Boli", dedicada a la producción y envasado de café listo para disfrutar.
              </Typography>
            </Paper>
            <HomeImages aboutUsSx={aboutUsSx} />
          </Box>
        </Box>
      </Paper>
      <CoffeeDivider />
      <Box sx={{ textAlign: 'center', bgcolor: 'background.darkPaper', py: 3, width: "100vw" }}>
        <Typography variant="body2" color="inherit">
          © {new Date().getFullYear()} Coffee The Diamond Don Boli. All rights reserved.
        </Typography>
      </Box>
    </Stack>

  );
};

export default Home;
