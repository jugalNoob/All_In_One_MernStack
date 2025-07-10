import React, { useEffect, useState } from 'react';

function Storage() {
  const [storageData, setStorageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStorageData = async () => {
    try {
      const response = await fetch('http://localhost:9000/storage');
      const data = await response.json();

      if (Array.isArray(data)) {
        setStorageData(data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching storage data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStorageData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>💾 Storage Info</h1>
      {loading ? (
        <p>Loading storage data...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Mount</th>
              <th>Total</th>
              <th>Used</th>
              <th>Free</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {storageData.map((disk, index) => (
              <tr key={index}>
                <td>{disk.mount}</td>
                <td>{disk.total}</td>
                <td>{disk.used}</td>
                <td>{disk.free}</td>
                <td>{disk.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Storage;
