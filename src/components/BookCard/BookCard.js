import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book, onClick }) => {
  const navigate = useNavigate();
  const { volumeInfo } = book;
  const imageSrc =
    volumeInfo.imageLinks?.thumbnail ||
    'https://via.placeholder.com/128x195?text=No+Image';

  // Handle description: truncate if it's too long
  const fullDescription = volumeInfo.description || 'No description available.';
  const truncatedDescription =
    fullDescription.length > 100 ? fullDescription.substring(0, 100) + '...' : fullDescription;

  const handleClick = () => {
    if (onClick) {
      onClick(book);
    } else {
      navigate(`/book/${book.id}`);
    }
  };

  return (
    <div className="book-card" onClick={handleClick}>
      <img src={imageSrc} />
      <div className="book-info">
        <h3>{volumeInfo.title}</h3>
        <p>{volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
      </div>
    </div>
  );
};

export default BookCard;