import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '1rem',
        backgroundColor: '#282c34',
        color: 'white'
      }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/from" style={linkStyle}>Form</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/dash" style={linkStyle}>Dash</Link>
        <Link to="/forget" style={linkStyle}>Forget</Link>
        <Link to="/dashboardg" style={linkStyle}>GitHub Dashboard</Link>
                <Link to="/admin" style={linkStyle}>admin</Link>
      </nav>

      <Outlet /> {/* Renders nested child routes */}
    </>
  );
};

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontWeight: 'bold'
};

export default Nav;
