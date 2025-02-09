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
  
  // Create a ref for the sentinel element used by Intersection Observer
  const sentinelRef = useRef(null);

  // Update local state if the URL query changes
  useEffect(() => {
    setQuery(urlQuery);
    setBooks([]);
    setStartIndex(0);
  }, [urlQuery]);

  
  const loadBooks = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchBooks(query, startIndex);
      setBooks(prevBooks => [...prevBooks, ...result.items]);
      // Optionally, use result.totalItems or result.queryUsed for additional logic or display
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }, [query, startIndex]);
  
  // Load books when the component mounts and whenever query or startIndex changes
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // Use IntersectionObserver to implement infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading) {
            // When the sentinel is visible, increment the startIndex to load more books
            setStartIndex((prevIndex) => prevIndex + 10);
          }
        });
      },
      {
        root: null, // observing within the viewport
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    // Cleanup: unobserve the sentinel element on component unmount
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
      
      <div ref={sentinelRef} className="sentinel"></div>
    </div>
  );
};

export default HomePage;
