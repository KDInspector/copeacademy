// components/VideoPlayer.tsx

import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoURL?: string;
  uploadedVideoURL?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoURL,
  uploadedVideoURL,
}) => {
  const urlToPlay = videoURL || uploadedVideoURL || null;

  if (!urlToPlay) {
    return <div className="text-center text-gray-500">No video available.</div>;
  }

  return (
    <div className="player-wrapper">
      <ReactPlayer
        url={urlToPlay}
        controls
        width="100%"
        height="100%"
        className="react-player"
      />
    </div>
  );
};

export default VideoPlayer;
