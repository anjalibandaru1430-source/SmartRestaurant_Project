import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Restaurant',
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String, required: true },
    isVegetarian: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
    },
  },
  { timestamps: true }
);

const FoodItem = mongoose.model('FoodItem', foodItemSchema);
export default FoodItem;
