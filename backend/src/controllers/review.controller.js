import mongoose from "mongoose";
import Review from "../models/review.model.js";
import Book from "../models/book.model.js";

/**
 * @desc   Add a review for a book
 * @route  POST /api/reviews
 * @access private
 */
export const addReview = async (req, res) => {
    try {

        const { bookId, rating, reviewText } = req.body;
        if (!req.user?._id) {
            return res.status(401).json({ message: "Invalid user!" })
        }

        if (!bookId || !rating) {
            return res.status(400).json("Invalid BookId and rating!")
        }

        const existingReview = await Review.findOne({ bookId, userId: req.user._id });
        if (existingReview) {
            return res.status(400).json({ message: "You already reviewed this book!" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found!" })
        }

        const review = await Review.create({
            bookId,
            userId: req.user._id,
            rating,
            reviewText: reviewText || ""
        })

        res.status(201).json({
            review,
            message: "Review Submitted!"
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error!" })
    }
}

/**
 * @desc   Get all reviews for a book, with the logged-in user's review on top
 * @route  GET /api/reviews/:bookId
 * @access public / private (user optional)
 */
export const getReviewsByBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const reviews = await Review.find({bookId});

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found!" });
        }

        const averageRating =
            reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

        res.status(200).json({
            reviews,
            averageRating: averageRating.toFixed(2),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error!" });
    }
};


/**
 * @desc   Update a review (owner only)
 * @route  PUT /api/reviews/:id
 * @access private
 */
export const updateReview = async (req, res) => {
    try {

        if (!req.user?._id) {
            return res.status(401).json({ message: "Invalid user!" });
        }

        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found!" });
        }

        if (review.userId.toString() !== req.user._id) {
            return res.status(403).json({ message: "Not authorized to update this review!" });
        }

        const { rating, reviewText } = req.body;
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }
        review.rating = rating || review.rating;
        review.reviewText = reviewText || review.reviewText;

        const updatedReview = await review.save();
        res.status(200).json({ updatedReview, message: "Review updated!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error!" })
    }
}

/**
 * @desc   Delete a review (owner only)
 * @route  DELETE /api/reviews/:id
 * @access private
 */
export const deleteReview = async (req, res) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({ message: "Invalid user!" });
        }

        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found!" });
        }

        if (review.userId.toString() !== req.user._id) {
            return res.status(403).json({ message: "Not authorized to delete this review!" });
        }

        await Review.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Review deleted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error!" });
    }
};
