import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css'; // Import CSS if you want to style it externally

function Home() {
  return (
    <div>
      <nav className="navbar">
        <h2 className="logo">MERN Enterprise</h2>
        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/videolist">Video List</NavLink></li>
          <li><NavLink to="/videouploader">Upload Video</NavLink></li>
          <li><NavLink to="/redis">Redis</NavLink></li>
          <li><NavLink to="/get-adv">Advanced</NavLink></li>
          <li><NavLink to="/update/1">Update</NavLink></li>
          <li><NavLink to="/delete/1">Delete</NavLink></li>
        </ul>
      </nav>

      <div className="home-content">
        <h1>Welcome to the MERN Enterprise Dashboard</h1>
        <p>Select an option from the navbar above to continue.</p>
      </div>
    </div>
  );
}

export default Home;
