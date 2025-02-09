import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const firstNavLink = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Your search submit logic
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <h1>Book Store</h1>
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link ref={firstNavLink} to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/purchased" onClick={() => setIsMenuOpen(false)}>Purchased Books</Link>
      </div>
      <div className="search-container">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input type="text" placeholder="Search books..." />
          <button type="submit">Search</button>
        </form>
      </div>
      {user && (
        <button className="sign-out-button" onClick={logout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default Navbar;