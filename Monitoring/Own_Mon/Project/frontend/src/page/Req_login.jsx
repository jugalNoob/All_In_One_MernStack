import React, { useState, useEffect } from 'react';

function Req() {
  const [count, setCount] = useState(null);

  const fetchRequestCount = async () => {
    try {
      const response = await fetch('http://localhost:9000/login');
      const data = await response.json();
      console.log(data); // Log the full response for debugging

      // Extract the visitCount from the response
      if (data.visitCount !== undefined) {
        setCount(data.visitCount); // Set the count to state
      } else {
        console.error("visitCount is missing in the response");
      }
    } catch (error) {
      console.error("Error fetching request count:", error);
    }
  };

  useEffect(() => {
    fetchRequestCount(); // Call the function once when the component mounts
  }, []); // Empty dependency array ensures it only runs once

  return (
    <div>
      <h1>Home Page Visits</h1>
      {count !== null ? (
        <p>Total /home requests: {count}</p>
      ) : (
        <p>Loading count...</p>
      )}
    </div>
  );
}

export default Req;
