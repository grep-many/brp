import express from "express"
import { auth } from "../middlewares/auth.middleware.js"
import {
    addReview,
    deleteReview,
    getReviewsByBook,
    updateReview
} from "../controllers/review.controller.js"

const router = express.Router()

router.post("/",auth,addReview)
router.get("/:bookId",auth,getReviewsByBook)
router.put("/:id",auth,updateReview)
router.delete("/:id",auth,deleteReview)

router.all("/",(req,res)=>{
    res.status(405).json({
        message:"Invalid request method!"
    })
})

export default router