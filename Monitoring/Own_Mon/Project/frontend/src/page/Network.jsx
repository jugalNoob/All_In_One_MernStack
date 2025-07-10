import React, { useState, useEffect } from 'react';

function Network() {
  const [network, setNetwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNetworkData = async () => {
    try {
      const response = await fetch('http://localhost:9000/network'); // Make sure this matches your backend
      const data = await response.json();

      if (data.network) {
        setNetwork(data.network);
      } else {
        throw new Error("Network data missing in response");
      }
    } catch (err) {
      console.error("Error fetching network data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNetworkData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🌐 Network Stats</h1>
      {loading ? (
        <p>Loading network data...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <div>
          <pre>{JSON.stringify(network, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Network;
