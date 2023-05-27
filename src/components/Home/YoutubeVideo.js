import React from "react";
import PropTypes from "prop-types";
import { CardMedia } from "@mui/material";

const YoutubeVideo = ({ embedId }) => {
  const [x, setX] = React.useState(0);
  return (
    <CardMedia
      component="iframe"
      src={`https://www.youtube.com/embed/${embedId}?loop=1`}
      sx={{
        
        width: {
          xs: "100%",
          md: "70%",
        },
        height: {
          xs: "calc(100vh - 240px)",
          md: "calc(100vh - 280px)",
        },
        padding: "10px 0 0",
        bgcolor: "background.default",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
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
