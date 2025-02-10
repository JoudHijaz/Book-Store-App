import React, { useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const firstNavLink = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Your search submit logic here
  };

  return (
    <nav className="navbar">
      <h1>Book Store</h1>
      <div className="nav-links">
        <NavLink
          ref={firstNavLink}
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Home
        </NavLink>
        <NavLink
          to="/purchased"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Purchased Books
        </NavLink>
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