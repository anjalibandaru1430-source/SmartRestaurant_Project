import FoodItem from '../models/FoodItem.js';
import Restaurant from '../models/Restaurant.js';

// @desc    Get food items for a restaurant
// @route   GET /api/restaurants/:restaurantId/menu
// @access  Public
const getMenuByRestaurant = async (req, res, next) => {
  try {
    const menu = await FoodItem.find({ restaurantId: req.params.restaurantId });
    res.json(menu);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a food item
// @route   POST /api/menu
// @access  Private/Admin
const createFoodItem = async (req, res, next) => {
  try {
    const { restaurantId, name, description, price, image, category, isVegetarian, nutritionalInfo } = req.body;
    
    // Check if the user is the admin of this restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      res.status(404);
      throw new Error('Restaurant not found');
    }

    if (restaurant.adminId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to add items to this restaurant');
    }

    const foodItem = new FoodItem({
      restaurantId,
      name,
      description,
      price,
      image,
      category,
      isVegetarian,
      nutritionalInfo
    });

    const createdFoodItem = await foodItem.save();
    res.status(201).json(createdFoodItem);
  } catch (error) {
    next(error);
  }
};

export { getMenuByRestaurant, createFoodItem };
