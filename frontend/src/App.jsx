import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import RestaurantDetails from './pages/RestaurantDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderHistory from './pages/OrderHistory.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import DeliveryDashboard from './pages/DeliveryDashboard.jsx';
import AIChatbot from './components/AIChatbot.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/myorders" element={<OrderHistory />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/delivery" element={<DeliveryDashboard />} />
          </Routes>
        </main>
        <AIChatbot />
        <footer className="bg-gray-800 text-gray-400 text-sm text-center p-6 mt-auto">
          &copy; {new Date().getFullYear()} SmartRest. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
