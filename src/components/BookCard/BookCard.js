import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const { volumeInfo } = book;
  const imageSrc = 
                   volumeInfo.imageLinks?.thumbnail ||
                   'https://via.placeholder.com/128x195?text=No+Image';

  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="book-card" onClick={handleClick}>
      <img src={imageSrc} alt={`Cover for ${volumeInfo.title}`} />
      <div className="book-info">
        <h3>{volumeInfo.title}</h3>
        <p>{volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
      </div>
    </div>
  );
};

export default BookCard;