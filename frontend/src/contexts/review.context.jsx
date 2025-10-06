import { createContext, useState } from 'react';
import { toast } from 'sonner';
import {
  addReviewService,
  getReviewsByBookService,
  updateReviewService,
  deleteReviewService,
} from '../services/review.service';

export const ReviewContext = createContext();

const ReviewProvider = ({ children }) => {
  const [reviewsByBook, setReviewsByBook] = useState({});
  const [averageRatingByBook, setAverageRatingByBook] = useState({});
  const [loading, setLoading] = useState(false);

  // --- Fetch reviews for a specific book ---
  const getReviewsByBook = async (bookId) => {
    try {
      setLoading(true);
      const data = await getReviewsByBookService(bookId);

      setReviewsByBook((prev) => ({
        ...prev,
        [bookId]: data.reviews || [],
      }));

      setAverageRatingByBook((prev) => ({
        ...prev,
        [bookId]: Number(data.averageRating || 0),
      }));

      return data;
    } catch (err) {
      toast.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- Add review (optimistic update) ---
  const addReview = async (reviewData) => {
    try {
      setLoading(true);
      const data = await addReviewService(reviewData);
      toast.success(data.message || 'Review added successfully!');

      // Optimistically update state
      setReviewsByBook((prev) => {
        const current = prev[reviewData.bookId] || [];
        const updated = [...current, data.review];
        return { ...prev, [reviewData.bookId]: updated };
      });

      setAverageRatingByBook((prev) => {
        const current = reviewsByBook[reviewData.bookId] || [];
        const updated = [...current, data.review];
        const avg =
          updated.reduce((sum, r) => sum + r.rating, 0) / updated.length;
        return { ...prev, [reviewData.bookId]: avg };
      });

      return data.review;
    } catch (err) {
      toast.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- Update review (optimistic update) ---
  const updateReview = async (reviewId, updatedData, bookId) => {
    try {
      setLoading(true);
      const data = await updateReviewService(reviewId, updatedData);
      toast.success(data.message || 'Review updated successfully!');

      setReviewsByBook((prev) => {
        const current = prev[bookId] || [];
        const updated = current.map((r) =>
          r._id === reviewId ? { ...r, ...updatedData } : r
        );
        return { ...prev, [bookId]: updated };
      });

      setAverageRatingByBook((prev) => {
        const updated = (reviewsByBook[bookId] || []).map((r) =>
          r._id === reviewId ? { ...r, ...updatedData } : r
        );
        const avg =
          updated.length > 0
            ? updated.reduce((sum, r) => sum + r.rating, 0) / updated.length
            : 0;
        return { ...prev, [bookId]: avg };
      });

      return data.updatedReview;
    } catch (err) {
      toast.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- Delete review (optimistic update) ---
  const deleteReview = async (reviewId, bookId) => {
    try {
      setLoading(true);
      const data = await deleteReviewService(reviewId);
      toast.success(data.message || 'Review deleted successfully!');

      setReviewsByBook((prev) => {
        const updated = (prev[bookId] || []).filter((r) => r._id !== reviewId);
        return { ...prev, [bookId]: updated };
      });

      setAverageRatingByBook((prev) => {
        const updated = (reviewsByBook[bookId] || []).filter(
          (r) => r._id !== reviewId
        );
        const avg =
          updated.length > 0
            ? updated.reduce((sum, r) => sum + r.rating, 0) / updated.length
            : 0;
        return { ...prev, [bookId]: avg };
      });

      return data;
    } catch (err) {
      toast.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviewsByBook,
        averageRatingByBook,
        getReviewsByBook,
        addReview,
        updateReview,
        deleteReview,
        loading,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;