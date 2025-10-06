import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import routes from "./routes/index.js"
import { origin } from "./config/env.js";
connectDB();

const app = express();

app.use(express.json());
app.use(cors({origin}));

app.use("/api",routes)

app.use((err,req,res,next)=>{
    res.status(404).json({
        message:"Route not Found!"
    })
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app