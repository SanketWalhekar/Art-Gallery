// Login.jsx
import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:4000/api/login/login', { email, password })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data)
          // Show success message
          toast.success('Login successful!', {
            position: 'top-right',
          });
          // Save token to local storage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('artistId',response.data.id);
          // Redirect to home page
          setTimeout(() => navigate('/home'), 2000);
        } else {
          // Show error message if login fails
          toast.error(response.data.message || 'Login failed', {
            position: 'top-right',
          });
        }
      })
      .catch((err) => {
        console.error(err);
        // Show error message if there's an error in the request
        toast.error('An error occurred. Please try again.', {
          position: 'top-right',
        });
      });
  };

  return (
    <div className="registration-form-container">
      <ToastContainer />
      <h1 className="form-title">Login</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Login
          </button>
        </div>
        <div className="login-link">
          <p>
            Don't have an account? <a href="/">Signup</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;