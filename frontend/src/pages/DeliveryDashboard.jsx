import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Map, Navigation } from 'lucide-react';

const DeliveryDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo || userInfo.role !== 'Delivery') {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <Navigation className="mr-3 text-orange-600 w-8 h-8" /> Delivery Partner Hub
      </h1>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600">
          <Map className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold mb-2">You are currently online</h2>
        <p className="text-gray-500 mb-8">Waiting for new delivery requests...</p>
        <button className="bg-red-50 text-red-600 font-bold py-3 px-8 rounded-full hover:bg-red-100 transition-colors">
          Go Offline
        </button>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
