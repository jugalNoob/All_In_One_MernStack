import React from 'react';

function App() {

  const videoUrl = "http://localhost:9000/video/streaming";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem' }}>
      
      {/* 🎥 Video Player */}
      <video
        style={{ width: 500 }}
        controls
        muted
        src={videoUrl}
      />

      {/* ⬇️ Download Button */}
      <a href={videoUrl} download="video.mp4">
        <button>Download</button>
      </a>
    </div>
  );
}

export default App;




  {/* Native HTML Video Player */}
      {/* <video
        style={{ width: 500 }}
        controls
        muted
        src="http://localhost:9000/video/streaming"
      /> */}




      //       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         gap: '1rem',
//         padding: '2rem',
//       }}
//     >
//       {/* 🔼 Top Buttons */}
//       <div>
//         {/* <button onClick={() => alert("Top Button clicked")}>Top Button</button> */}
//       </div>

//       {/* 🎥 Video Player */}
//       <VideoPlayer src={videoUrl} setQuality={setQuality} />

//       <a href={videoUrl} download="video.mp4">
//           <button>Download</button>
//         </a>
//       {/* 🔽 Bottom Buttons */}
//       <div style={{ display: 'flex', gap: '1rem' }}>
//         <button onClick={() => alert("Bottom Button clicked")}>Bottom Button</button>

//         {/* ⬇️ Download Button */}
//         <a href={videoUrl} download="video.mp4">
//           <button>Download</button>
//         </a>
//       </div>