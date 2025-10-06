import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trash2Icon, EditIcon } from 'lucide-react';
import { useEffect } from 'react';
import useBook from '../hooks/useBook';
import useAuth from '../hooks/useAuth';
import { formatDate } from './DateInput';
import { useNavigate } from 'react-router-dom';
import RatingStars from './Review/RatingStars'; // ✅ import
import useReview from '../hooks/useReview';

const BookCard = ({ book }) => {
  const { deleteBook } = useBook();
  const { user } = useAuth();
  const { reviewsByBook, averageRatingByBook, getReviewsByBook } =
    useReview();

  const navigate = useNavigate();

  // Fetch reviews for this book
  useEffect(() => {
    if (book?._id) getReviewsByBook(book._id);
  }, [book?._id]);

  const bookReviews = reviewsByBook[book._id] || [];
  const avgRating = averageRatingByBook[book._id] || 0;
  const reviewCount = bookReviews.length;

  const shortDescription =
    book.description?.length > 100
      ? `${book.description.slice(0, 97).trim()}...`
      : book.description || 'No description available.';

  return (
    <Card
      onClick={() => navigate(`/book/${book._id}`)}
      className="w-full h-full border hover:shadow-lg transition-shadow duration-200 relative flex flex-col cursor-pointer"
    >
      {/* Avatar / Image */}
      <div className="flex justify-center mt-4">
        <Avatar className="w-20 h-20">
          <AvatarFallback className="text-background bg-foreground text-2xl font-bold">
            {book.title?.[0]?.toUpperCase() || '?'}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Book Info */}
      <CardContent className="flex flex-col flex-1 px-4 pt-2">
        <CardTitle className="text-lg font-semibold text-foreground capitalize line-clamp-2">
          {book.title || 'Untitled'}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-1">
          {book.author || 'Unknown Author'}
        </CardDescription>

        {/* Average rating */}
        <div className="flex items-center mt-2 gap-2">
          <RatingStars rating={avgRating} /> {/* ✅ use RatingStars */}
          <span className="text-xs text-muted-foreground ml-1">
            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
          </span>
        </div>

        {/* Short description */}
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
          {shortDescription}
        </p>

        {/* Genre badges */}
        {book.genre?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {book.genre.map((g, idx) => (
              <Badge key={idx}>
                {g}
              </Badge>
            ))}
          </div>
        )}

        {/* Year & Added By */}
        <div className="flex justify-between mt-3 text-xs text-muted-foreground">
          <span>
            {book.year
              ? `Published: ${formatDate(new Date(book.year))}`
              : 'Year Unknown'}
          </span>
          <span>
            Added by:{' '}
            {book.addedBy?._id === user._id
              ? 'You'
              : `${book.addedBy?.name || 'Unknown'}`}
          </span>
        </div>

        {/* Edit/Delete buttons */}
        {book.addedBy?._id === user._id && (
          <div className="mt-4 flex justify-end gap-2">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/edit-book/${book._id}`);
              }}
              className="p-2"
            >
              <EditIcon className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                deleteBook(book._id);
              }}
              className="p-2"
            >
              <Trash2Icon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookCard;
