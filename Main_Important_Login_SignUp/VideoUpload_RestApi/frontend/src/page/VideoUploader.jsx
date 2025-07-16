import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a video");

    const formData = new FormData();
    formData.append('file', file); // Must match 'file' in multer.single()

    setUploading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert('Upload failed: ' + err.response?.data?.error || err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload}>
        <input 
          type="file" 
          accept="video/*" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default Upload;