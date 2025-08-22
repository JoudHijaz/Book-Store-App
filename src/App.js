import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
      <>
        <Navbar />
        <Routes>
          {/* Ensure the initial #/ hits Home */}
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/purchased" element={<PurchasedBookPages />} />
          {/* Either redirect unknown paths to Home... */}
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* ...or use your NotFoundPage instead:
             <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
