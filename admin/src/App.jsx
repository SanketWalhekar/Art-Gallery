// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';



const App = () => {
  const url = "http://localhost:4000";
  return (
    <div>
      
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        

        {/* Protected Route */}
         <Route
          path="/home/*"
          element={
            <ProtectedRoute>
              <Home />
             </ProtectedRoute>  
          }
        >
          {/* Nested Route for Add Component */}
          <Route path="add" element={<Add url={url}/>} />
          <Route path="list" element={<List url={url}/>} />
          <Route path="orders" element={<Orders url={url}/>} />


        </Route>
      </Routes>
    </div>
  );
};

export default App;