import React from "react";
import { ImageListItem, ImageListItemBar, ImageList, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import images

const HomeImages = ({ aboutUsSx }) => {


  const images = [
    {
      url: "https://diamondcoffeevideos.s3.us-east-2.amazonaws.com/HomeImages/WhatsApp-Image-2023-05-26-at-11.53.34-AM.jpg",
      title: 'Leidy',
      id: 1,
      description: "some description Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      url: "https://diamondcoffeevideos.s3.us-east-2.amazonaws.com/HomeImages/IMG_4637.JPEG",
      title: 'Alex',
      id: 2,
      description: "some description Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      url: "https://diamondcoffeevideos.s3.us-east-2.amazonaws.com/HomeImages/IMG_4636.JPEG",
      title: 'Café',
      id: 3,
      description: "some description Lorem ipsum dolor sit amet consectetur adipisicing elit somoe description about this image that i'll put for the user to know what is all about or what is that mean."
    },
    {
      url: "https://diamondcoffeevideos.s3.us-east-2.amazonaws.com/HomeImages/IMG_1031.JPEG",
      title: 'Proceso de café',
      id: 4,
      description: "some description Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      url: "https://diamondcoffeevideos.s3.us-east-2.amazonaws.com/HomeImages/IMG_1030.JPEG",
      title: 'Café',
      id: 5,
      description: "some description Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      url: "https://diamondcoffeevideos.s3.us-east-2.amazonaws.com/HomeImages/IMG_5093.JPEG",
      title: 'Café',
      id: 6,
      description: "some description Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },

  ];

  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setOpen(true);
  };

  const handleImageClose = () => {
    //setSelectedImageIndex(null);
    setOpen(false);
  };

  const imageSx = {
    img: {
      borderRadius: "8px",
      width: "100%",
      objectFit: "contain",
      border: "1px solid",
      borderColor: "border.grey",
      margin: "0 0 8px",
    },
  };


  return (
    <>
      <ImageList cols={2} gap={8} sx={aboutUsSx}>
        {images.map((item, idx) => (
          <ImageListItem key={item.id} sx={{ img: { borderRadius: "8px" } }}
            onClick={() => handleImageClick(idx)}
          >
            <img
              src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}

              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>

        ))}
      </ImageList>
      <Dialog
        open={open}
        onClose={handleImageClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          margin: "auto",
          ".MuiDialog-paper": {
            pb: 2,
            borderRadius: "8px",
            border: "1px solid",
            borderColor: "border.grey",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{images[selectedImageIndex]?.title}</DialogTitle>
        <DialogContent sx={imageSx}>
          <img
            src={images[selectedImageIndex].url}
            alt={images[selectedImageIndex].title}
            loading="lazy"
          />
            <Typography>
              {images[selectedImageIndex]?.description}
            </Typography>
        </DialogContent>
        <IconButton onClick={handleImageClose} sx={{position: "absolute", top: 0, right: 0, color: "background.cart"}}>
          <CloseIcon />
        </IconButton>

      </Dialog>

    </>
  );
};

export default HomeImages;
