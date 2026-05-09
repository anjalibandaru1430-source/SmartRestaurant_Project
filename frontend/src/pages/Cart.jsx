import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart, clearCart } from '../features/cart/cartSlice.js';
import { Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
        <ShoppingBag className="w-8 h-8 mr-3 text-orange-600" /> Your Cart
      </h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="inline-block bg-orange-600 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-700 transition-colors shadow-md">
            Browse Restaurants
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <li key={item._id} className="p-6 flex items-center">
                    <img src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'} alt={item.name} className="w-20 h-20 rounded-xl object-cover shadow-sm" />
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      <p className="text-orange-600 font-semibold mt-1">₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button 
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 font-bold"
                          onClick={() => dispatch(addToCart({...item, qty: -1}))}
                          disabled={item.qty === 1}
                        >-</button>
                        <span className="px-3 py-1 font-medium">{item.qty}</span>
                        <button 
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 font-bold"
                          onClick={() => dispatch(addToCart({...item, qty: 1}))}
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCartHandler(item._id)}
                        className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <button onClick={() => dispatch(clearCart())} className="text-red-600 font-medium hover:underline">
                  Clear Cart
                </button>
                <Link to="/" className="text-orange-600 font-medium hover:underline">
                  Add more items
                </Link>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                  <span>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹40.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes (5%)</span>
                  <span>₹{(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * 0.05).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{(
                    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) + 
                    40 + 
                    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * 0.05
                  ).toFixed(2)}</span>
                </div>
              </div>
              
              <button
                type="button"
                className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition-colors shadow-md"
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
