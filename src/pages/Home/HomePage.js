// src/pages/Home/HomePage.js
import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import BookContainer from '../../containers/BookContainer/BookContainer';
import { fetchBooks } from '../utils/api';
import './HomePage.css';

const HomePage = () => {
  const location = useLocation();
  const urlQuery = new URLSearchParams(location.search).get('q');
  const { user } = useContext(AuthContext);

  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState(urlQuery);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Create a ref for the sentinel element used by the Intersection Observer
  const sentinelRef = useRef(null);

  // When the URL query changes, reset the state
  useEffect(() => {
    setQuery(urlQuery);
    setBooks([]);
    setStartIndex(0);
  }, [urlQuery]);

  // Function to load books from the API
  const loadBooks = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchBooks(query, startIndex);
      setBooks(prevBooks => [...prevBooks, ...result.items]);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }, [query, startIndex]);

  // Load books initially and whenever query or startIndex changes
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // Set up Intersection Observer to trigger loading before reaching the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger loading if the sentinel is within 200px of the viewport
          if (entry.isIntersecting && !loading) {
            setStartIndex(prevIndex => prevIndex + 10);
          }
        });
      },
      {
        root: null,
        // Trigger when the sentinel is within 200px of the viewport
        rootMargin: '200px',
        // A low threshold means even a little intersection will trigger the callback
        threshold: 0,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    // Cleanup: Unobserve the sentinel element on component unmount
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading]);

  return (
    <div className="homepage-container">
      {user ? (
        <h1>Welcome back, {user.email}!</h1>
      ) : (
        <h1>Welcome, Guest!</h1>
      )}
      <BookContainer books={books} />
      {loading && <div className="loading">Loading...</div>}
      {/* Sentinel element to trigger infinite scroll */}
      <div ref={sentinelRef} className="sentinel"></div>
    </div>
  );
};

export default HomePage;
