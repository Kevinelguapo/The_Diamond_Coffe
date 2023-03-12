import React from "react";
import { ImageListItem, ImageListItemBar, ImageList, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import images
import poster from "../../assets/coffee/poster.jpg";
import cafeRobustaYArabica from "../../assets/coffee/cafe-robusta-y-arabica.jpg";
import geishabeans from "../../assets/coffee/geishabeans.jpg";
import presentacion from "../../assets/coffee/Presentación.jpg";
import ubicacion from "../../assets/coffee/Ubicación.jpg";


const HomeImages = ({ aboutUsSx }) => {

  const images = [
    {
      url: poster,
      title: 'Image',
      id: 1,
      description: "some description Lorem ipsum dolor sit amet consectetur adipisicing elit some description Lorem ipsum dolor sit amet consectetur adipisicing elit somoe description about this image that i'll put for the user to know what is all about or what is that mean."
    },
    {
      url: cafeRobustaYArabica,
      title: 'Image',
      id: 2,
      description: "some description Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      url: geishabeans,
      title: 'Image',
      id: 3,
      description: "some description Lorem ipsum dolor sit amet consectetur adipisicing elit somoe description about this image that i'll put for the user to know what is all about or what is that mean."
    },
    {
      url: presentacion,
      title: 'Image',
      id: 4,
      description: "some description Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      url: poster,
      title: 'Image',
      id: 5,
      description: "some description Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
      url: ubicacion,
      title: 'Image',
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
      border: "2px solid",
      borderColor: "background.cart",
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
        sx={{margin: "auto"}}
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
