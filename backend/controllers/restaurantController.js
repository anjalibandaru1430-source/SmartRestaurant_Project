import Restaurant from '../models/Restaurant.js';

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single restaurant by ID
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404);
      throw new Error('Restaurant not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a restaurant
// @route   POST /api/restaurants
// @access  Private/Admin
const createRestaurant = async (req, res, next) => {
  try {
    const restaurant = new Restaurant({
      name: req.body.name,
      description: req.body.description,
      adminId: req.user._id,
      images: req.body.images || [],
      address: req.body.address,
      cuisineTypes: req.body.cuisineTypes,
      deliveryTime: req.body.deliveryTime,
    });

    const createdRestaurant = await restaurant.save();
    res.status(201).json(createdRestaurant);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a restaurant
// @route   PUT /api/restaurants/:id
// @access  Private/Admin
const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (restaurant) {
      if (restaurant.adminId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this restaurant');
      }

      restaurant.name = req.body.name || restaurant.name;
      restaurant.description = req.body.description || restaurant.description;
      restaurant.images = req.body.images || restaurant.images;
      restaurant.address = req.body.address || restaurant.address;
      restaurant.cuisineTypes = req.body.cuisineTypes || restaurant.cuisineTypes;
      restaurant.deliveryTime = req.body.deliveryTime || restaurant.deliveryTime;
      restaurant.isOpen = req.body.isOpen !== undefined ? req.body.isOpen : restaurant.isOpen;

      const updatedRestaurant = await restaurant.save();
      res.json(updatedRestaurant);
    } else {
      res.status(404);
      throw new Error('Restaurant not found');
    }
  } catch (error) {
    next(error);
  }
};

export { getRestaurants, getRestaurantById, createRestaurant, updateRestaurant };
