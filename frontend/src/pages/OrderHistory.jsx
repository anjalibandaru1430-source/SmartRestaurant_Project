import React from 'react';
import { useGetMyOrdersQuery } from '../features/orders/ordersApiSlice.js';
import { Link } from 'react-router-dom';
import { Package, Clock } from 'lucide-react';

const OrderHistory = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  if (isLoading) return <div className="p-8 text-center">Loading orders...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Failed to load orders.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
        <Package className="w-8 h-8 mr-3 text-orange-600" /> My Orders
      </h1>

      {orders?.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-6">You have no orders yet.</p>
          <Link to="/" className="inline-block bg-orange-600 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-700 transition-colors shadow-sm">
            Order Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">Order #{order._id.substring(order._id.length - 8)}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-gray-500 flex items-center text-sm mb-4">
                  <Clock className="w-4 h-4 mr-1" /> {new Date(order.createdAt).toLocaleDateString()}
                </div>
                <div className="text-gray-700">
                  {order.orderItems.map((item) => (
                    <span key={item._id} className="inline-block mr-3 mb-2 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100 text-sm font-medium">
                      {item.qty}x {item.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right flex flex-col items-end w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                <p className="text-2xl font-bold text-gray-900 mb-4">₹{order.totalPrice.toFixed(2)}</p>
                <Link to={`/order/${order._id}`} className="w-full md:w-auto text-center border border-orange-600 text-orange-600 font-bold py-2 px-6 rounded-lg hover:bg-orange-50 transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
