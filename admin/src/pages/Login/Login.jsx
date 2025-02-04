import React, { useState } from 'react';
import './Login_admin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verify,setVerify]=useState(0);
  const [otp, setOtp] = useState('');
  

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:4000/api/login/login', { email, password })
      .then((response) => {
        if (response.data.isActive) {
          console.log(response.data)
          // Show success message
          toast.success('Otp Send successfully!', {
            position: 'top-right',
          });
          // Save token to local storage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('artistId',response.data.id);
          localStorage.setItem('email',email);
          localStorage.setItem('isAuth',response.data.isAuth);
          localStorage.setItem('planexpiry',response.data.planExpiry);
          
          
          // sentOTP
          setVerify(1);
        } else {
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

  const handleSubmitVerify = (e) => {
    e.preventDefault();
    const data = {
        email: localStorage.getItem('email'),
        otp: otp,
      };
    axios
      .post('http://localhost:4000/api/login/verifyotp', data)
      .then((response) => {
        
        console.log(response);
        localStorage.setItem("isAuth",response.data.isAuth);
        // Check if the response indicates success
        if (response.data.success && localStorage.getItem("isAuth")) {
          toast.success('Login Successfully!', {
            position: 'top-right',
          });
          
          setTimeout(() => navigate('/home'), 4000); // Redirect to login page after 2 seconds
        } else {
            toast.error(response.data.message, {
                position: 'top-right',
            });
        }
      })
      .catch((error) => {
        // Handle errors gracefully
        console.error('Error during OTP verification:', error);
        toast.error(response.data.message, {
            position: 'top-right',
        });
      }); 
  };

  return (
    <>
      <ToastContainer />
      {verify === 0 ? (
        // Login Form
        <div className="registration-form-container">
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
                Don't have an account? <a href="/register">Signup</a>
              </p>
            </div>
            <div className="login-link">
              <p>
                <a href="/forgot">Forgot Password</a>
              </p>
            </div>
          </form>
        </div>
      ) : (
        // OTP Verification Form
        <div className="registration-form-container">
          <h1 className="form-title">OTP Verification</h1>
          <form onSubmit={handleSubmitVerify} className="registration-form">
          
            <div className="form-group">
              <label htmlFor="otp">Verify OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                placeholder="Enter your OTP"
                required
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="submit-button">
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;