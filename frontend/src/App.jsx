import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login.page';
import ProtectedRoute from './components/ProtectedRoute';
import SignUpPage from './pages/signup.page';
import HomePage from './pages/home.page';
import AddBookPage from './pages/add-book.page';
import UpdateBookPage from './pages/edit-book.page';
import BookDetailsPage from './pages/book-details.page';
import NotFound from './pages/not-found.page';

const App = () => {
  return (
    <Routes>

      {/* Public */}
      <Route element={<ProtectedRoute auth={false} />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/edit-book/:id" element={<UpdateBookPage />} />
        <Route path="/book/:id" element={<BookDetailsPage />} />
        {/* <Route path="/profile" element={<AddBookPage />} /> */}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
