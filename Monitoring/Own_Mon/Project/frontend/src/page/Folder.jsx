import React, { useEffect, useState } from 'react';

function FolderList() {
  const [directories, setDirectories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDirectories = async () => {
    try {
      const response = await fetch('http://localhost:9000/folder'); // Ensure this matches your backend
      const data = await response.json();

      if (data.directories) {
        setDirectories(data.directories);
      } else {
        throw new Error("Directory list not found in response");
      }
    } catch (err) {
      console.error("Error fetching directories:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectories();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>📁 Home Directories</h1>
      {loading ? (
        <p>Loading folders...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : directories.length === 0 ? (
        <p>No folders found.</p>
      ) : (
        <ul>
          {directories.map((dir, index) => (
            <li key={index}>{dir}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FolderList;
