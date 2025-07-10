import React from 'react';
import { Link } from  "react-router";

function Home() {
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/sha'>Sha</Link>
      <Link to="/encryption">encryption</Link>
    </div>
  );
}

export default Home;
