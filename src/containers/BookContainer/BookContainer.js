import React from 'react';
import BookCard from '../../components/BookCard/BookCard';
import './BookContainer.css';

const BookContainer = ({ books }) => {
  return (
    <div className="books-grid">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookContainer;