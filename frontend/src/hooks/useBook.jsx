import { useContext } from 'react';
import { BookContext } from '../contexts/book.context';

const useBook = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
};

export default useBook;