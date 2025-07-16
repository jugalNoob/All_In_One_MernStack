import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Redis() {
  const [students, setStudents] = useState([]);
  const [cacheStatus, setCacheStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:9000/getuser');

        setStudents(response.data);
        setCacheStatus(`📦 ${response.headers['x-cache']} (${response.headers['x-cache-source']}) — ${response.headers['x-response-time']}`);
        setError('');
      } catch (err) {
        console.error('❌ Error fetching student data:', err.message);

        if (err.response?.status === 429) {
          const retry = err.response.data.retryAfter || 'a few seconds';
          setError(`⏱ Rate limit exceeded. Try again in ${retry}.`);
        } else {
          setError('Something went wrong fetching data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📊 Redis Cache Student Viewer</h2>
      {cacheStatus && <p>{cacheStatus}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              <strong>{student.name}</strong> — Age: {student.age}, Country: {student.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Redis;
