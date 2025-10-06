import API from './api';

// --- Add a review (Private) ---
export const addReviewService = async (reviewData) => {
  try {
    const res = await API.post('/reviews', reviewData);
    return res.data; // { review, message }
  } catch (err) {
    throw err.response?.data?.message || err.message;
  }
};

// --- Get reviews for a book (Public or Private) ---
export const getReviewsByBookService = async (bookId) => {
  try {
    const res = await API.get(`/reviews/${bookId}`);
    return res.data; // { reviews, averageRating }
  } catch (err) {
    throw err.response?.data?.message || err.message;
  }
};

// --- Update review (Private / Owner Only) ---
export const updateReviewService = async (reviewId, updatedData) => {
  try {
    const res = await API.put(`/reviews/${reviewId}`, updatedData);
    return res.data; // { updatedReview, message }
  } catch (err) {
    throw err.response?.data?.message || err.message;
  }
};

// --- Delete review (Private / Owner Only) ---
export const deleteReviewService = async (reviewId) => {
  try {
    const res = await API.delete(`/reviews/${reviewId}`);
    return res.data; // { message: "Review deleted successfully!" }
  } catch (err) {
    throw err.response?.data?.message || err.message;
  }
};