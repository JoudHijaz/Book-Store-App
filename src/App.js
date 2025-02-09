import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/Home/HomePage';
import BookPage from './pages/Book/BookPage';
import Login from './pages/Login/Login';
import PurchasedBookPages from './pages/PurchasedBookPages/PurchasedBookPages';
import NotFoundPage from './pages/NotFoundPage';
import './global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar appears on all pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/purchased" element={<PurchasedBookPages />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;