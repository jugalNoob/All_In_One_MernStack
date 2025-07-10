import React, { useEffect, useState } from 'react';

function Uptime() {
  const [uptime, setUptime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUptime = async () => {
    try {
      const response = await fetch('http://localhost:9000/uptime');
      const result = await response.json();

      if (result.data) {
        setUptime(result.data);
      } else {
        throw new Error("Uptime data missing in response");
      }
    } catch (err) {
      console.error("Error fetching uptime:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUptime();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>⏱️ System Uptime</h1>
      {loading ? (
        <p>Loading uptime...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <pre>{JSON.stringify(uptime, null, 2)}</pre>
      )}
    </div>
  );
}

export default Uptime;
