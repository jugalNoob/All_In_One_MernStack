import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Home() {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/videos');
      setVideos(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch videos:', err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <h2>🏠 Home</h2>

      <NavLink to='/'>Home</NavLink> <br />
      <NavLink to='/Videolist'>GetYour</NavLink> <br />
      <NavLink to='/VideoUploader'>Upload Form</NavLink> <br />

      <hr />
      <h3>🎬 Video List (Dynamic)</h3>
      {videos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        videos.map((video) => (
          <div key={video._id}>
            <NavLink to={`/video/${encodeURIComponent(video.filename)}`}>
              {video.filename}
            </NavLink>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;




  // <NavLink to='/'>Home</NavLink>
  //     <br />

  //     <NavLink to='/get'>GetYour</NavLink>
  //     <br />

  //     <NavLink to='/form'>Upload Form</NavLink>
  //     <br />

  //     {/* Replace with real filename that exists in DB */}
  //     <NavLink to="/video/video_1752549990027_1%232.mp4">Test Video</NavLink>