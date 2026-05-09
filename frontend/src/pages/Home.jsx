import React, { useState } from 'react';
import { useGetRestaurantsQuery } from '../features/restaurants/restaurantsApiSlice.js';
import RestaurantCard from '../components/RestaurantCard.jsx';
import { Search, SlidersHorizontal } from 'lucide-react';

const Home = () => {
  const { data: restaurants, isLoading, error } = useGetRestaurantsQuery();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRestaurants = restaurants?.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.cuisineTypes && r.cuisineTypes.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-orange-50 rounded-3xl p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-8 md:mb-0 md:pr-8 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Discover the best food & drinks in <span className="text-orange-600">SmartRest</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Order food from favourite restaurants near you. Fast, easy, and smart delivery powered by AI.
          </p>
          
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border-0 ring-1 ring-inset ring-gray-200 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600 sm:text-md shadow-sm"
              placeholder="Search for restaurants, cuisine or a dish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="hidden md:block w-1/3">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" alt="Delicious Food" className="rounded-full shadow-2xl object-cover h-64 w-64 border-8 border-white" />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Top Restaurants</h2>
        <button className="flex items-center text-gray-600 hover:text-orange-600 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm transition-colors">
          <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-2xl h-72 border border-gray-100">
              <div className="bg-gray-200 h-48 rounded-t-2xl"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-8 bg-red-50 rounded-2xl shadow-sm border border-red-100">
          <h3 className="text-lg font-bold">Failed to load restaurants</h3>
          <p className="text-sm mt-1">Please ensure the backend server is running.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRestaurants?.length > 0 ? (
            filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 p-12 bg-white rounded-2xl border border-gray-100">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-lg font-medium">No restaurants found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
