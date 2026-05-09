# SmartRest - AI-Powered Food Delivery Platform

SmartRest is a modern, production-ready food delivery web application built with the MERN stack (MongoDB, Express, React, Node.js). It includes features tailored for Customers, Restaurant Admins, and Delivery Partners.

## Features

- **Multi-Role System**: Customer, Admin (Restaurant Manager), Delivery Partner.
- **Modern UI**: Built with React, Tailwind CSS v4, and Lucide Icons.
- **State Management**: Redux Toolkit & RTK Query for efficient data fetching and caching.
- **AI Integration**: AI Chatbot to recommend food and answer delivery questions.
- **Real-Time capabilities**: Socket.IO integrated for live updates (infrastructure ready).
- **Secure Authentication**: JWT-based auth with bcrypt password hashing.
- **Full E-commerce Flow**: Browse restaurants, view menus, add to cart, checkout, and order history.

## Project Structure

- `frontend/` - React application built with Vite and Tailwind CSS.
- `backend/` - Node.js/Express server and MongoDB models.

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure MongoDB is running on your machine (or update `MONGO_URI` in `.env` to a MongoDB Atlas string).
4. Start the server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`*

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173` (or similar)*

## Technologies Used

- **Frontend**: React 19, Redux Toolkit, Tailwind CSS v4, React Router DOM, Lucide React, Axios.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Socket.IO, JWT, bcryptjs.
"# SmartRestaurant_Project" 
