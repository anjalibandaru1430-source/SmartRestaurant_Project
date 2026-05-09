import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere',
      },
    },
    cuisineTypes: [{ type: String }],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    deliveryTime: { type: String, default: '30-45 min' },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;
