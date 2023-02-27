import React from "react";
import PropTypes from "prop-types";
import { CardMedia } from "@mui/material";

const YoutubeVideo = ({ embedId }) => {
  return (
    <CardMedia
      component="iframe"
      src={`https://www.youtube.com/embed/${embedId}?autoplay=1&loop=1`}
      sx={{
        height: {
          xs: "300px",
          sm: "400px",
          md: "500px",
          lg: "600px",
          xl: "700px",
        },
      }}
      allowFullScreen
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      title="Embedded youtube"
      frameBorder={0}
    ></CardMedia>
  );
};

YoutubeVideo.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeVideo;
