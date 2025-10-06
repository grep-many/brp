import mongoose from "mongoose";

/**
 * Book Schema
 * Fields:
 * - title: String, required
 * - author: String, required
 * - description: String, optional
 * - genre: String, optional
 * - year: Number, optional
 * - addedBy: ObjectId reference to User, required
 */
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    genre: {
      type: [String],
      default: [],
      trim: true,
    },
    year: {
      type: Date,
      required:[true,"Published date is required"]
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;