// page/Login.js
import React from 'react';

const GitLogin = () => {
  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:9000/auth/github';
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <button onClick={handleGitHubLogin}>
        Login with GitHub
      </button>
    </div>
  );
};

export default GitLogin;

