import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookDetail from '../../components/BookDetails/BookDetails';
import { fetchBookById } from '../utils/api';
import './BookPage.css';

function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const fetchedBook = await fetchBookById(id);
        setBook(fetchedBook);
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found.</div>;

  return <BookDetail book={book} />;
}

export default BookPage;