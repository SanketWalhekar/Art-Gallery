import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import List from './components/List/List';
import Artist from './components/Artist/Artist';
import User from './components/User/User';
import Order from './components/Order/Order';

import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/home/*"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            {/* Nested Routes for Home */}
            <Route path="list" element={<List url={url} />} />
            <Route path="artist" element={<Artist url={url} />} />
            <Route path="user" element={<User url={url} />} />
            <Route path="order" element={<Order url={url} />} />




          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
