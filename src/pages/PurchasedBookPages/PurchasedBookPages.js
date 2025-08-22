import React, { useContext, useEffect, useState } from 'react';
import BookCard from '../../components/BookCard/BookCard'; // Adjust path as needed
import { AuthContext } from '../../contexts/AuthContext';
import './PurchasedBookPages.css';

const PurchasedBookPages = () => {
  const { user } = useContext(AuthContext);
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [modalBook, setModalBook] = useState(null);

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

  // openModal function to store selected book details in state
  const openModal = (book) => {
    setModalBook(book);
  };

  // Close the modal when clicked outside or when pressing close button
  const closeModal = () => {
    setModalBook(null);
  };

  return (
    <div className="purchased-books-container">
      <h1>Purchased Books</h1>
      {purchasedBooks.length === 0 ? (
        <p>You haven't purchased any books yet.</p>
      ) : (
        <div className="Purchased-books-grid">
          {purchasedBooks.map((book) => (
            <BookCard key={book.id} book={book} onClick={openModal} />
          ))}
        </div>
      )}

      {modalBook && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalBook.volumeInfo.title}</h2>
            <p>
              <strong>Author:</strong>{' '}
              {modalBook.volumeInfo.authors
                ? modalBook.volumeInfo.authors.join(', ')
                : 'Unknown Author'}
            </p>
            <p>
              <strong>Description:</strong>
            </p>
            {(() => {
              const fullDesc = modalBook.volumeInfo.description || 'No Description Available.';
              const truncatedDescription = fullDesc.length > 200 ? fullDesc.substring(0, 200) + '...' : fullDesc;
              return <p className="book-description">{truncatedDescription}</p>;
            })()}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasedBookPages;