import React from "react";
import ReactPlayer from "react-player/youtube";
//import "~react-image-gallery/styles/css/image-gallery.css";
// Only loads the YouTube player
export default (props) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={props.url}
        width="100%"
        height="100%"
        controls="true"
        //playing
      />
    </div>
  );
};
