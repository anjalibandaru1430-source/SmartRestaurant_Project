import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, PlusCircle, Settings, Edit3 } from 'lucide-react';

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('orders');

  if (!userInfo || userInfo.role !== 'Admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
        <h2 className="text-xl font-bold text-gray-800 mb-8 flex items-center">
          <Settings className="mr-2" /> Admin Panel
        </h2>
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ShoppingBag className="w-5 h-5 mr-3" /> Orders
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'menu' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Edit3 className="w-5 h-5 mr-3" /> Manage Menu
          </button>
          <button 
            onClick={() => setActiveTab('add')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${activeTab === 'add' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <PlusCircle className="w-5 h-5 mr-3" /> Add Item
          </button>
        </nav>
      </div>

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 capitalize flex items-center">
            <LayoutDashboard className="mr-3 text-orange-600" /> {activeTab} Dashboard
          </h1>
        </div>

        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <p className="text-gray-500 text-center py-12">No active orders right now.</p>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <p className="text-gray-500 text-center py-12">Your menu items will appear here.</p>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-2xl">
            <h3 className="text-lg font-bold mb-4">Add New Food Item</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Item Name" className="w-full p-3 border rounded-lg" />
              <textarea placeholder="Description" className="w-full p-3 border rounded-lg"></textarea>
              <input type="number" placeholder="Price" className="w-full p-3 border rounded-lg" />
              <input type="text" placeholder="Image URL" className="w-full p-3 border rounded-lg" />
              <button className="bg-orange-600 text-white font-bold py-3 px-6 rounded-lg w-full hover:bg-orange-700 transition-colors">Save Item</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
