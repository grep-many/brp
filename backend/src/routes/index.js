import express from 'express';
import userRoutes from './user.route.js';
import bookRoutes from './book.route.js';
import reviewRoutes from './review.route.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);

export default router;