import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../features/orders/ordersApiSlice.js';
import { clearCart } from '../features/cart/cartSlice.js';
import { CreditCard, MapPin } from 'lucide-react';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = itemsPrice > 0 ? 40 : 0;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + deliveryFee + taxPrice;

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createOrder({
        restaurantId: cart.restaurantId,
        orderItems: cart.cartItems,
        deliveryAddress: address,
        paymentMethod: 'Card',
        itemsPrice,
        taxPrice,
        deliveryFee,
        totalPrice,
      }).unwrap();
      dispatch(clearCart());
      navigate(`/order/${res._id}`); // We will create this page next, or redirect to order history
    } catch (err) {
      console.error(err);
      alert(err.data?.message || err.error);
    }
  };

  if (cart.cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
          <form id="checkout-form" onSubmit={placeOrderHandler} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-orange-600" /> Delivery Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <input type="text" placeholder="Street Address" required className="w-full border-gray-300 rounded-lg p-3 border focus:ring-orange-500 focus:border-orange-500" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
              </div>
              <div>
                <input type="text" placeholder="City" required className="w-full border-gray-300 rounded-lg p-3 border focus:ring-orange-500 focus:border-orange-500" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
              </div>
              <div>
                <input type="text" placeholder="Postal Code" required className="w-full border-gray-300 rounded-lg p-3 border focus:ring-orange-500 focus:border-orange-500" value={address.postalCode} onChange={(e) => setAddress({...address, postalCode: e.target.value})} />
              </div>
              <div className="col-span-2">
                <input type="text" placeholder="Country" required className="w-full border-gray-300 rounded-lg p-3 border focus:ring-orange-500 focus:border-orange-500" value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})} />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mt-10 mb-6 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-orange-600" /> Payment Details
            </h2>
            <div className="p-4 border rounded-xl bg-orange-50 text-orange-800 border-orange-200 mb-4">
              <p className="font-medium">Demo Mode</p>
              <p className="text-sm">For demonstration purposes, payment processing is mocked. Click 'Place Order' to proceed.</p>
            </div>
          </form>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="flex items-center text-gray-700">
                    <span className="font-bold mr-2">{item.qty}x</span> {item.name}
                  </span>
                  <span className="text-gray-900 font-medium">₹{(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 pt-4 border-t text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>₹{itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{taxPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total to Pay</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={isLoading}
              className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition-colors shadow-sm disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
