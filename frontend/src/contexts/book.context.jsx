import { createContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  fetchBooks,
  fetchBookById,
  createBook,
  modifyBook,
  removeBook,
} from '../services/book.service';

export const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading,setLoading] = useState(false)

  // --- Fetch books with pagination ---
  const getBooks = async (pageNumber = 1) => {
    try {
      setLoading(true)
      const data = await fetchBooks(pageNumber);
      setBooks(data.books);
      setPage(data.page);
      setPages(data.pages);
      setTotalBooks(data.totalBooks);
    } catch (error) {
      toast.error(error);
      throw error
    } finally {
      setLoading(false)
    }
  };

  // --- Add a new book ---
  const addBook = async (bookData) => {
    try {
      setLoading(true)
      const newBook = await createBook(bookData);
      toast.success(`Book ${newBook.title} added successfully`);
      getBooks(page); // refresh current page
      return newBook;
    } catch (error) {
      toast.error(error);
      throw error;
    } finally {
      setLoading(false)
    }
  };

  // --- Update book ---
  const updateBook = async (id, bookData) => {
    try {
      setLoading(true)
      const updatedBook = await modifyBook(id, bookData);
      toast.success(`Book ${updatedBook.title} updated successfully`);
      getBooks(page);
      return updatedBook;
    } catch (error) {
      toast.error(error);
      throw error;
    } finally {
      setLoading(false)
    }
  };

  // --- Delete book ---
  const deleteBook = async (id) => {
    try {
      setLoading(true)
      const res = await removeBook(id);
      toast.success(res.message);

      // Handle edge case: last item on page deleted
      if (books.length === 1 && page > 1) {
        setPage(page - 1);
        getBooks(page - 1);
      } else {
        getBooks(page);
      }
    } catch (error) {
      toast.error(error);
      throw error;
    } finally {
      setLoading(false)
    }
  };

  // --- Fetch single book ---
  const getBookById = async (id) => {
    try {
      setLoading(true);
      const book = await fetchBookById(id);
      return book;
    } catch (error) {
      toast.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // --- Next / Previous Page ---
  const nextPage = () => {
    if (page < pages) {
      getBooks(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      getBooks(page - 1);
    }
  };

  // --- Initial load ---
  useEffect(() => {
    getBooks(page);
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        page,
        pages,
        totalBooks,
        getBooks,
        addBook,
        updateBook,
        deleteBook,
        getBookById,
        nextPage,
        prevPage,
        loading
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
