import React from 'react';
import logo from './logo.jpg';
import './NavBar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
        <h1>Typing Test</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="http://localhost:3000/">Sign-Out</a></li>
        <li><a href="http://localhost:3000/History">History</a></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;