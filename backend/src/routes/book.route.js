import express from "express"
import {
    addBook,
    deleteBook,
    getBookById,
    getBooks,
    updateBook
} from "../controllers/book.controller.js"
import { auth } from "../middlewares/auth.middleware.js"

const router = express.Router()

// public routes
router.get("/", getBooks)
router.get("/:id", getBookById)

// private routes
router.post("/",auth, addBook)
router.put("/:id",auth, updateBook)
router.delete("/:id",auth, deleteBook)

router.all("/", (req, res) => {
    res.status(405).json({
        message: "Invalid request method!"
    })
})
export default router;