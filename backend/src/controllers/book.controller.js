import Book from "../models/book.model.js";

const PAGE_SIZE = 5

/**
 * @desc   Add a new book
 * @route  POST /api/books
 * @access private
 */
export const addBook = async (req, res) => {
    try {

        if (!req.user?._id) {
            return res.status(401).json({ message: "Invalid User!" })
        }

        const { title, author, description, genre, year } = req.body;

        if (!title || !author) {
            return res.status(400).json({ message: "Title and Author are required!" })
        }

        const book = await Book.create({
            title,
            author,
            description,
            genre,
            year,
            addedBy: req.user?._id,
        });
        const populatedBook = await book.populate("addedBy", "name email");

        res.status(201).json(populatedBook)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error!" });
    }
};

/**
 * @desc   Get all books with pagination (current user's books first)
 * @route  GET /api/books?page=1
 * @access public
 */
export const getBooks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const userId = req.user?._id; // may be undefined if public access

    const totalBooks = await Book.countDocuments();

    // Sort books: user's books first, then newest created
    const books = await Book.find()
      .sort({
        // First sort by whether the book is added by current user
        ...(userId && { 
          addedBy: {
            $eq: [userId, '$addedBy'], // NOT supported in find().sort() directly
          }
        }),
        createdAt: -1
      })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .populate('addedBy', 'name email');

    // Fallback if conditional sort not supported:
    // Separate user's books and others in JS
    if (userId) {
      const allBooks = await Book.find()
        .sort({ createdAt: -1 })
        .populate('addedBy', 'name email');

      const userBooks = allBooks.filter(b => b.addedBy._id.toString() === userId.toString());
      const otherBooks = allBooks.filter(b => b.addedBy._id.toString() !== userId.toString());

      const paginatedBooks = [...userBooks, ...otherBooks].slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

      return res.status(200).json({
        page,
        pages: Math.ceil(totalBooks / PAGE_SIZE),
        totalBooks,
        books: paginatedBooks,
      });
    }

    res.status(200).json({
      page,
      pages: Math.ceil(totalBooks / PAGE_SIZE),
      totalBooks,
      books,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error!" });
  }
};

/**
 * Get a single book by ID
 * @param req.params.id
 * @access public
 */
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("addedBy", "name email");
        if (!book) {
            return res.status(404).json({ message: "Book not found!" })
        }

        res.status(200).json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error!" })
    }
}

/**
 * Update a book (only owner)
 * @param req.params.id
 * @param req.body
 * @access private
*/
export const updateBook = async (req, res) => {
    try {

        if (!req.user?._id) {
            return res.status(401).json({ message: "Invalid User!" })
        }

        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found!" })
        }

        if (book.addedBy.toString() !== req.user?._id) {
            return res.status(403).json({ message: "Not authorized to update this book!" });
        }

        const { title, author, description, genre, year } = req.body;

        book.title = title || book.title;
        book.author = author || book.author;
        book.description = description || book.description;
        book.genre = genre || book.genre;
        book.year = year || book.year;

        const updatedBook = await book.save();
        res.status(200).json(updatedBook);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error!" })
    }
}

/**
 * Delete a book (only owner)
 * @param req.params.id
 * @access private
 */
export const deleteBook = async (req, res) => {
    try {

        if (!req.user?._id) {
            return res.status(401).json({ message: "Invalid User!" })
        }

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found!" })
        }

        if (book.addedBy.toString() !== req.user?._id) {
            return res.status(403).json({ message: "Not authorized to delete this book!" });
        }

        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: `${book.title} has been deleted.` });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error!" })
    }
}