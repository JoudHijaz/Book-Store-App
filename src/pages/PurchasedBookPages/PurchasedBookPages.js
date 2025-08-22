// src/pages/PurchasedBookPages/PurchasedBookPages.js
import React, { useContext, useEffect, useState } from 'react';
import BookCard from '../../components/BookCard/BookCard'; // Adjust path as needed
import { AuthContext } from '../../contexts/AuthContext';
import './PurchasedBookPages.css';

const PurchasedBookPages = () => {
  const { user } = useContext(AuthContext);
  const [purchasedBooks, setPurchasedBooks] = useState([]);

  useEffect(() => {
    // Retrieve all purchased books from local storage
    const allPurchased = JSON.parse(localStorage.getItem('purchasedBooks')) || [];
   
    if (user && user.email) {
      const userBooks = allPurchased.filter(
        (book) => book.purchasedBy === user.email
      );
      setPurchasedBooks(userBooks);
    } else {
      setPurchasedBooks([]);
    }
  }, [user]);

  return (
    <div className="purchased-books-container">
      <h1>Purchased Books</h1>
      {purchasedBooks.length === 0 ? (
        <p>You haven't purchased any books yet.</p>
      ) : (
        <div className="Purchased-books-grid">
          {purchasedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchasedBookPages;
