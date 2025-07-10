import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cpu() {
  const [cpuUsage, setCpuUsage] = useState([]);
  const [coreKeys, setCoreKeys] = useState([]);

  const fetchCpuUsage = async () => {
    try {
      const response = await axios.get('http://localhost:9000/cpu');
      const data = response.data;

      // Detect core keys from first item
      if (data.length > 0 && coreKeys.length === 0) {
        const dynamicCoreKeys = Object.keys(data[0]).filter(key => key !== 'time');
        setCoreKeys(dynamicCoreKeys);
      }

      setCpuUsage(data);
    } catch (error) {
      console.error('Error fetching CPU usage:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchCpuUsage, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ textAlign: 'center' }}>Live CPU Usage Table</h2>
      {cpuUsage.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Arial' }}>
            <thead style={{ backgroundColor: '#f2f2f2' }}>
              <tr>
                <th style={cellStyle}>Time</th>
                {coreKeys.map((core) => (
                  <th key={core} style={cellStyle}>{core.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cpuUsage.map((entry, idx) => (
                <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                  <td style={cellStyle}>{entry.time}</td>
                  {coreKeys.map((core) => (
                    <td key={core} style={cellStyle}>{entry[core]}%</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

const cellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
};

export default Cpu;
