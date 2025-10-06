import express from "express";
import { getUserProfile, loginUser, registerUser } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post("/signin",loginUser)
router.post("/signup",registerUser)
router.get("/profile",auth,getUserProfile)

router.all("/",(req,res)=>{
    res.status(405).json({
        message:"Invalid request method!"
    })
})

export default router