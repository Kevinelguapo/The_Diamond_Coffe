import React from "react";
import PropTypes from "prop-types";
import { CardMedia } from "@mui/material";

const YoutubeVideo = ({ embedId }) => {
  return (
    <CardMedia
      component="iframe"
      src={`https://www.youtube.com/embed/${embedId}?loop=1`}
      sx={{
        height: {
          xs: "350px",
          sm: "400px",
          md: "500px",
          lg: "550px",
          xl: "600px",
        },
        padding: "10px 0 0",
        bgcolor: "background.appBar",
      }}
      allowFullScreen
      // allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; mute=1"
      title="Embedded youtube"
      frameBorder={0}
     
    ></CardMedia>
  );
};

YoutubeVideo.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeVideo;
