import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Utensils, LogOut, User, ShoppingCart } from 'lucide-react';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="flex items-center space-x-2">
        <Utensils className="text-orange-600 h-8 w-8" />
        <h1 className="text-2xl font-extrabold text-orange-600 tracking-tight">SmartRest</h1>
      </Link>
      <nav className="flex items-center space-x-4">
        <Link to="/cart" className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors mr-2">
          <ShoppingCart className="w-6 h-6" />
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-orange-600 rounded-full">{cartItems.reduce((a, c) => a + c.qty, 0)}</span>
          )}
        </Link>
        {userInfo ? (
          <div className="flex items-center space-x-4">
            {userInfo.role === 'Admin' && (
              <Link to="/admin" className="text-orange-600 hover:text-orange-700 transition-colors mr-4 font-bold">Admin Panel</Link>
            )}
            {userInfo.role === 'Delivery' && (
              <Link to="/delivery" className="text-orange-600 hover:text-orange-700 transition-colors mr-4 font-bold">Delivery Hub</Link>
            )}
            <Link to="/myorders" className="text-gray-700 hover:text-orange-600 transition-colors mr-4 font-medium">My Orders</Link>
            <span className="text-gray-700 font-medium flex items-center">
              <User className="h-4 w-4 mr-1" /> {userInfo.name}
            </span>
            <button
              onClick={logoutHandler}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">Login</Link>
            <Link to="/register" className="px-4 py-2 text-sm font-medium bg-orange-600 text-white rounded-md hover:bg-orange-700 shadow-sm transition-colors">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
