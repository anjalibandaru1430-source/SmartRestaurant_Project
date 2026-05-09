import express from 'express';
import {
  createFoodItem,
} from '../controllers/menuController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createFoodItem);

export default router;
