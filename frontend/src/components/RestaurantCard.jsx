import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={restaurant.images && restaurant.images.length > 0 ? restaurant.images[0] : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'} 
          alt={restaurant.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg tracking-wider uppercase">Closed</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{restaurant.name}</h3>
          <div className="flex items-center bg-green-100 px-2 py-1 rounded text-green-700 text-sm font-bold">
            <Star className="w-3 h-3 mr-1 fill-current" /> {restaurant.rating || 'New'}
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-2 truncate">{restaurant.cuisineTypes?.join(', ') || 'Various Cuisines'}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-3">
          <div className="flex items-center truncate mr-2">
            <MapPin className="w-4 h-4 mr-1 text-gray-400 flex-shrink-0" />
            <span className="truncate">{restaurant.address?.street || 'Bangalore'}</span>
          </div>
          <div className="flex items-center flex-shrink-0">
            <Clock className="w-4 h-4 mr-1 text-orange-500" /> 
            <span>{restaurant.deliveryTime || '30-45 min'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
