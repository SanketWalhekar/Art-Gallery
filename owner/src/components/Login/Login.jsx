import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login12.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/owner/login', {
        email,
        password,
      });

      if (response.data.success) {
        toast.success(response.data.message, { position: 'top-right' });
        // Save token to localStorage for authentication
        localStorage.setItem('token', response.data.token);
        // Redirect to dashboard or another page
        window.location.href = '/home';
      } else {
        toast.error(response.data.message, { position: 'top-right' });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error occurred during login. Please try again.', {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1 className="form-title">Login</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="login-button">
            Login
          </button>
          <p>
            <center>
              Don't have an account? <a href="/">Register</a>
            </center>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
