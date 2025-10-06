import { useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import useBook from '../hooks/useBook';
import EmptyCard from '../components/EmptyCard';
import { useNavigate } from 'react-router-dom';
import { booksImg } from '../assets';
import BookCard from '../components/BookCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const HomePage = () => {
  const { books, page, pages, getBooks } = useBook();
  const navigate = useNavigate();

  useEffect(() => {
    getBooks(page);
  }, [page]);

  return (
    <>
      <div className="container mx-auto py-6">
        {books.length === 0 ? (
          <EmptyCard
            img={booksImg}
            message="No Books!"
            onClick={() => navigate('/add-book')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        {/* Minimal First/Prev/Next/Last Pagination */}
        {books.length > 0 && (
          <Pagination className="mt-8 flex justify-center items-center space-x-2">
            <PaginationContent>
              {/* Previous Page */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 1 && getBooks(page - 1)}
                  disabled={page === 1} // disables correctly
                  className={`select-none ${
                    page === 1 && 'cursor-not-allowed'
                  }`}
                />
              </PaginationItem>

              {/* Current Page */}
              <PaginationItem>
                <PaginationLink isActive>{page}</PaginationLink>
              </PaginationItem>

              {/* Next Page */}
              <PaginationItem>
                <PaginationNext
                  className={`select-none ${
                    page === pages && 'cursor-not-allowed'
                  }`}
                  onClick={() => page < pages && getBooks(page + 1)}
                  disabled={page === pages} // disables correctly
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
      <Button
        className="backdrop-blur bg-foreground/70 text-background hover:bg-foreground/50 hover:text-background w-16 h-16 items-center justify-center rounded-2xl fixed right-10 bottom-5 cursor-pointer"
        onClick={()=>navigate("/add-book")}
      >
        <Plus />
      </Button>
    </>
  );
};

export default HomePage;