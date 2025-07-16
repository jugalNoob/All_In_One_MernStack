import React from 'react';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
  const { filename } = useParams();

  return (
    <div>
      <h2>Playing: {decodeURIComponent(filename)}</h2>
      <video width="640" height="360" controls>
        <source src={`http://localhost:5000/api/video/${filename}`} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
