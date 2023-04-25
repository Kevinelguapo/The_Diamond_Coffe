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
          sx: 400,
          md: 600,
        },
        minHeight: 400,
        padding: "10px 0 0",
        bgcolor: "background.default",
      }}
      allowFullScreen
      // allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; mute=1"
      title="Embedded youtube"
      frameBorder={0}

    />
  );
};

YoutubeVideo.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeVideo;
