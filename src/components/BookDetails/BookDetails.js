import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './BookDetails.css';

const BookDetail = ({ book }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { volumeInfo } = book;

  const imageSrc =
    volumeInfo.imageLinks?.thumbnail;

  // State for controlling the purchase modal and loading spinner
  const [showModal, setShowModal] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [rating, setRating] = useState(0);

  // Handler for the Buy button click – open confirmation modal
  const handleBuyClick = () => {
    setShowModal(true);
  };

  // Handler for confirming the purchase; removes the confirmation modal immediately
  // then shows a 5-second loading spinner before completing the purchase.
  const handleConfirmPurchase = () => {
    setShowModal(false); // Remove confirmation modal from the DOM
    setBuyLoading(true);
    setTimeout(() => {
      const purchasedBooks = JSON.parse(localStorage.getItem('purchasedBooks')) || [];
      const bookToPurchase = { ...book, purchasedBy: user.email };
      purchasedBooks.push(bookToPurchase);
      localStorage.setItem('purchasedBooks', JSON.stringify(purchasedBooks));
      setBuyLoading(false);
      alert('Book purchased successfully!');
    }, 5000);
  };
  // Handler for setting the rating when a star is clicked
  const handleRating = (newRating) => {
    setRating(newRating);
    alert(`You rated this book ${newRating} star${newRating > 1 ? 's' : ''}!`);
  };

  if (!user) {
    // If the user is not logged in, show the "Join Now" screen.
    return (
      <div className="join-now">
        <h2>Join Now</h2>
        <p>
          You need to log in to view detailed book information, rate, and purchase books.
        </p>
        <div className="join-buttons">
          <button
            onClick={() =>
              navigate('/login', { state: { from: location.pathname } })
            }
          >
            Login
          </button>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  // For logged-in users, show the detailed book information along with purchase options.
  return (
    <div className="book-detail">
      <button className="back-button" onClick={() => navigate('/')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>
      <h2>{volumeInfo.title}</h2>
      {volumeInfo.authors && <p>By: {volumeInfo.authors.join(', ')}</p>}
      {imageSrc && (
        <img src={imageSrc} alt={`Cover for ${volumeInfo.title}`} />
      )}
      <p>{volumeInfo.description || 'No Description Available.'}</p>
         {/* Rating UI */}
         <div className="rating">
        <p>Rate this book:</p>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            style={{
              color: star <= rating ? 'white' : '#ccc',
              cursor: 'pointer',
              fontSize: '24px'
            }}
          >
            ★
          </span>
        ))}
      </div>
      {/* Buy Button */}
      <button className="buy-button" onClick={handleBuyClick}>
        Buy
      </button>

      {/* Display loading spinner during the purchase process */}
      {buyLoading && <div className="spinner">Processing purchase...</div>}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Purchase</h3>
            <p>Are you sure you want to purchase this book?</p>
            <div className="modal-actions">
              <button onClick={handleConfirmPurchase}>Confirm</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;