
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/videos');
      setVideos(res.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Uploaded Videos</h2>
      {videos.map((video) => (
        <div key={video._id}>
          <p>{video.filename}</p>
          <Link to={`/video/${encodeURIComponent(video.filename)}`}>▶ Play</Link>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
