import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import RatingStars from '../components/Review/RatingStars';
import ReviewSection from '../components/Review/ReviewSection';
import EmptyCard from '../components/EmptyCard';
import { booksImg } from '../assets';
import useBook from '../hooks/useBook';
import useReview from '../hooks/useReview'
import { 
  EditIcon, 
  Trash2Icon, 
  CalendarIcon, 
  UserIcon, 
  ClockIcon, 
  BookOpenIcon, 
  FileTextIcon 
} from 'lucide-react';
import { formatDate } from '@/components/DateInput';
import ReviewStats from '../components/Review/ReviewStats';

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById, deleteBook, loading } = useBook();
  const { averageRatingByBook } = useReview();
  const { user } = useAuth();

  const [book, setBook] = useState(null);

  // Fetch book by id
  const fetchBook = useCallback(async () => {
    const data = await getBookById(id);
    setBook(data);
  }, [id, getBookById]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  // Delete book handler
  const handleDelete = async () => {
    await deleteBook(book._id);
    navigate('/');
  };

  if (!book) {
    return (
      <EmptyCard 
        img={booksImg} 
        message={loading ? "Loading book..." : "Book Not Found!"} 
        onClick={() => navigate('/')} 
      />
    );
  }

  const { title, author, description, year, genre, addedBy, createdAt, updatedAt } = book;

  return (
    <div className="container mx-auto px-4 py-8 lg:flex lg:gap-10">
      
      {/* Left: Book Avatar + Basic Info */}
      <div className="lg:w-1/3 mb-8 lg:mb-0">
        <div className="sticky top-24 flex flex-col items-center">
          <Avatar className="w-48 h-48 lg:w-64 lg:h-64 shadow-md">
            <AvatarFallback className="bg-foreground text-background text-9xl font-bold">
              {title?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="mt-4 text-center space-y-2">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">
              Author: {author || 'Unknown Author'}
            </p>
            <div className="flex justify-center">
              <RatingStars rating={averageRatingByBook[book._id] || 0} />
            </div>
            <span className="text-xs text-muted-foreground">
              {averageRatingByBook[book._id] || 0} / 5 average rating
            </span>
          </div>
        </div>
      </div>

      {/* Right: Detailed Info */}
      <div className="flex-1 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto pr-2">
        <div className="pb-10 space-y-8">
          
          {/* Book Overview */}
          <Section title="Book Overview" icon={BookOpenIcon}>
            <p className="text-base leading-relaxed text-muted-foreground">
              {description || 'No description available for this book.'}
            </p>
          </Section>

          {/* Core Info */}
          <Section title="Core Information" icon={FileTextIcon}>
            <div className="bg-muted/30 rounded-md p-4 space-y-2 text-sm">
              <InfoRow label="Title" value={title} />
              <InfoRow label="Author" value={author} />
              <InfoRow label="Published" value={year ? formatDate(year) : 'Unknown'} />
              <div>
                <strong>Genres:</strong>{' '}
                {genre?.length ? (
                  <span className="flex flex-wrap gap-2 mt-1">
                    {genre.map((g, i) => <Badge key={i} variant="secondary">{g}</Badge>)}
                  </span>
                ) : 'No genres listed'}
              </div>
            </div>
          </Section>

          {/* Metadata */}
          <Section title="Metadata" icon={ClockIcon}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <InfoRow icon={UserIcon} label="Added By" value={addedBy?.name || addedBy?.username || 'Anonymous'} />
              <InfoRow icon={CalendarIcon} label="Added On" value={createdAt ? formatDate(createdAt) : 'N/A'} />
              <InfoRow icon={ClockIcon} label="Last Updated" value={updatedAt ? formatDate(updatedAt) : 'N/A'} />
            </div>
          </Section>

          {/* Actions */}
          {addedBy?._id === user?._id && (
            <Section title="Actions">
              <div className="flex gap-3">
                <Button onClick={() => navigate(`/edit-book/${book._id}`)}>
                  <EditIcon className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2Icon className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </Section>
          )}

          {/* Reviews */}
          <Section>
            {!averageRatingByBook[book._id]==0&&<ReviewStats id={book._id}/>}
            <ReviewSection bookId={book._id} />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;

// -----------------------
// Helper components
// -----------------------
const Section = ({ title, icon: Icon, children }) => (
  <section>
    {title && (
      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5" />} {title}
      </h3>
    )}
    {children}
  </section>
);

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2">
    {Icon && <Icon className="w-4 h-4 text-foreground" />}
    <span><strong>{label}:</strong> {value || 'N/A'}</span>
  </div>
);
