import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import RatingStars from './RatingStars';
import ReviewForm from './ReviewForm';
import { Button } from '@/components/ui/button';
import { Trash2Icon, EditIcon, XIcon } from 'lucide-react';
import useReview from '../../hooks/useReview';

const ReviewSection = ({ bookId }) => {
  const { user } = useAuth();
  const {
    reviewsByBook,
    averageRatingByBook,
    getReviewsByBook,
    addReview,
    updateReview,
    deleteReview,
    loading,
  } = useReview();

  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    getReviewsByBook(bookId);
  }, [bookId]);

  const handleAddOrUpdateReview = async (reviewData) => {
    if (editingReview) {
      await updateReview(editingReview._id, reviewData, bookId);
      setEditingReview(null);
    } else {
      await addReview({ ...reviewData, bookId });
    }
  };

  const reviews = reviewsByBook[bookId] || [];
  const averageRating = averageRatingByBook[bookId] || 0;

  // Separate current user review from others
  const myReview = reviews.find((r) => r.userId === user?._id);
  const otherReviews = reviews.filter((r) => r.userId !== user?._id);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">Customer Reviews</h3>

      <div className="flex items-center gap-2 mt-1">
        <RatingStars rating={averageRating} />
        <span className="text-sm text-muted-foreground">
          {averageRating} out of 5 ({reviews.length} reviews)
        </span>
      </div>

      {user && (
        <div className="mt-4">
          {!myReview && !editingReview && (
            <ReviewForm
              onSubmit={handleAddOrUpdateReview}
              submitting={loading}
            />
          )}

          {myReview && !editingReview && (
            <div className="border rounded-md p-4 bg-muted/30 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  You’ve already reviewed this book.
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <RatingStars rating={myReview.rating} size={14} />
                  <span className="text-sm">{myReview.rating}/5</span>
                </div>
                <p className="mt-1 text-sm">{myReview.reviewText}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setEditingReview(myReview)}
                >
                  <EditIcon className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteReview(myReview._id, bookId)}
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {editingReview && (
            <div className="relative border rounded-md p-4 bg-card">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Edit Your Review</h4>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setEditingReview(null)}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
              <ReviewForm
                onSubmit={handleAddOrUpdateReview}
                submitting={loading}
                initialRating={editingReview.rating}
                initialText={editingReview.reviewText}
              />
            </div>
          )}
        </div>
      )}

      <div className="mt-6 space-y-4">
        {otherReviews.length === 0 && (
          <p className="text-sm text-muted-foreground">No other reviews yet.</p>
        )}

        {otherReviews.map((r) => (
          <div key={r._id} className="border rounded-lg p-4 bg-card shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{r.user?.name}</h4>
                <RatingStars rating={r.rating} size={14} />
                <p className="text-sm mt-1">{r.reviewText}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;