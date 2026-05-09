import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRestaurantByIdQuery } from '../features/restaurants/restaurantsApiSlice.js';
import { apiSlice } from '../features/api/apiSlice.js';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice.js';
import { Star, Clock, Info, Plus } from 'lucide-react';

const menuApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenuByRestaurant: builder.query({
      query: (restaurantId) => ({
        url: `/restaurants/${restaurantId}/menu`,
      }),
      providesTags: ['Menu'],
    }),
  }),
});

const { useGetMenuByRestaurantQuery } = menuApiSlice;

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { data: restaurant, isLoading: loadingRest } = useGetRestaurantByIdQuery(id);
  const { data: menu, isLoading: loadingMenu } = useGetMenuByRestaurantQuery(id);

  const [toastMessage, setToastMessage] = useState('');

  const addToCartHandler = (item) => {
    try {
      dispatch(addToCart({ ...item, qty: 1 }));
      setToastMessage('Item added to cart!');
      setTimeout(() => setToastMessage(''), 3000);
    } catch (error) {
      alert(error.message);
    }
  };

  if (loadingRest || loadingMenu) return <div className="p-8 text-center">Loading...</div>;
  if (!restaurant) return <div className="p-8 text-center text-red-500">Restaurant not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <img src={restaurant.images?.[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'} alt={restaurant.name} className="rounded-2xl w-full h-64 object-cover shadow-md" />
        </div>
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-extrabold text-gray-900">{restaurant.name}</h1>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-bold flex items-center text-lg shadow-sm">
              <Star className="w-5 h-5 mr-1 fill-current" /> {restaurant.rating || 'New'}
            </div>
          </div>
          <p className="text-gray-500 text-lg mb-4">{restaurant.cuisineTypes?.join(', ')}</p>
          <div className="flex items-center text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4 gap-6">
            <div className="flex items-center font-medium">
              <Clock className="w-5 h-5 mr-2 text-orange-500" /> {restaurant.deliveryTime}
            </div>
            <div className="flex items-center font-medium">
              <Info className="w-5 h-5 mr-2 text-blue-500" /> {restaurant.address?.street}, {restaurant.address?.city}
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Menu Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu?.map((item) => (
            <div key={item._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between hover:shadow-md transition-shadow">
              <div className="flex-1 pr-4">
                <div className="flex items-center mb-1">
                  {item.isVegetarian ? (
                    <span className="w-4 h-4 border-2 border-green-600 flex items-center justify-center rounded-sm mr-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    </span>
                  ) : (
                    <span className="w-4 h-4 border-2 border-red-600 flex items-center justify-center rounded-sm mr-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                </div>
                <p className="text-gray-900 font-semibold mb-2">₹{item.price}</p>
                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
              </div>
              <div className="relative w-32 h-32 flex-shrink-0">
                <img src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                <button 
                  onClick={() => addToCartHandler(item)}
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-orange-600 font-extrabold px-6 py-2 rounded-lg shadow-md hover:bg-orange-50 border border-orange-100 flex items-center uppercase text-sm tracking-wider"
                >
                  Add <Plus className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
          {menu?.length === 0 && (
            <p className="text-gray-500 col-span-full">No items found for this restaurant.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
