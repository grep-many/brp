import API from './api';

// --- Helper to handle API errors ---
const handleError = (err) => {
  throw err.response?.data?.message || err.message;
};

// --- Get All Books with Pagination ---
export const fetchBooks = async (page = 1) => {
  try {
    const res = await API.get(`/books?page=${page}`);
    return res.data; // { page, pages, totalBooks, books }
  } catch (err) {
    handleError(err);
  }
};

// --- Get Single Book by ID ---
export const fetchBookById = async (bookId) => {
  try {
    const res = await API.get(`/books/${bookId}`);
    return res.data; // single book object
  } catch (err) {
    handleError(err);
  }
};

// --- Add Book (Private / Owner Only) ---
export const createBook = async (bookData) => {
  try {
    const res = await API.post('/books', bookData);
    return res.data; // newly created book
  } catch (err) {
    handleError(err);
  }
};

// --- Update Book (Private / Owner Only) ---
export const modifyBook = async (bookId, updatedData) => {
  try {
    const res = await API.put(`/books/${bookId}`, updatedData);
    return res.data; // updated book
  } catch (err) {
    handleError(err);
  }
};

// --- Delete Book (Private / Owner Only) ---
export const removeBook = async (bookId) => {
  try {
    const res = await API.delete(`/books/${bookId}`);
    return res.data; // { message: "Book deleted" }
  } catch (err) {
    handleError(err);
  }
};