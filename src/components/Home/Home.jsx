import React from "react";
import YoutubeVideo from "./YoutubeVideo";
import {
  Typography,
  Box,
  Divider,
  MobileStepper,
  IconButton,
} from "@mui/material";
import video3 from "../../assets/videos/DJI_0210.MP4";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Link } from "react-router-dom";

const Home = () => {
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
      url: video3,
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = videos.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        padding: "80px 0px 16px",
        bgcolor: "background.paper",
        video: {
          width: "100%",
          maxWidth: "1111px",
          objectFit: "contain",
          display: "block",
          margin: "0 auto",
        },
      }}
    >
      {/* <video src={videos[activeStep].url} autoPlay loop /> */}
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
      />
      <Divider sx={{ margin: "16px 8px" }} />
      <Typography variant="h2" component="h1" align="center">
        Sobre Nosotros
      </Typography>
      <Typography variant="body2" align="center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptates, quod, quia, voluptate quae voluptatem quibusdam quos
        voluptatum quas natus quidem. Quisquam, quae. Quisquam, quae. Quisquam,
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptates, quod, quia, voluptate quae voluptatem quibusdam quos
        voluptatum quas natus quidem. Quisquam, quae. Quisquam, quae. Quisquam,
      </Typography>
      <Divider sx={{ margin: "16px 8px" }} />
      <Typography variant="h2" component="h1" align="center">
        Contactanos
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Link
          href="https://www.instagram.com/thediamond_coffee/"
          underline="none"
        >
          <InstagramIcon />
        </Link>
        <Link href="https://wa.me/573143267025">
          <WhatsAppIcon />
        </Link>
        <Link href="https://t.me/thediamondcoffee">
          <TelegramIcon />
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
