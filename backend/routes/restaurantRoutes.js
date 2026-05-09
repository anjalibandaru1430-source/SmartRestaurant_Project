import express from 'express';
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
} from '../controllers/restaurantController.js';
import { getMenuByRestaurant } from '../controllers/menuController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getRestaurants)
  .post(protect, admin, createRestaurant);

router.route('/:id')
  .get(getRestaurantById)
  .put(protect, admin, updateRestaurant);

router.route('/:restaurantId/menu').get(getMenuByRestaurant);

export default router;
