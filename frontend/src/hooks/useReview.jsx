import { useContext } from "react";
import { ReviewContext } from "../contexts/review.context";

const useReview = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
};

export default useReview;
