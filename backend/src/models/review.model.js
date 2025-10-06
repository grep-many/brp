import mongoose from "mongoose";

/**
 * Review Schema
 * Fields:
 * - bookId: ObjectId reference to Book, required
 * - userId: ObjectId reference to User, required
 * - rating: Number (1-5), required
 * - reviewText: String, optional
 */
const reviewSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book reference is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

/**
 * Optional: prevent a user from submitting multiple reviews per book
 */
reviewSchema.index({ bookId: 1, userId: 1 }, { unique: true });

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;