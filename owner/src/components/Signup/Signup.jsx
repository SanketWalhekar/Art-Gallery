import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/owner/register',
        {
          name,
          email,
          password,
        }
      );

      if(response.data.success){
        toast.success(response.data.message, {
            position: 'top-right',
          });
      }
      else if(!response.data.success){
        toast.error(response.data.message, {
          position: 'top-right',
        });
      }
      
      
    } catch (error) {
      console.error('Error creating payment session:', error);
      toast.error('Error during payment. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment();
  };

 

  return (
    <div className="container">
  {/* Left: Registration Form */}
  <div className="registration-form-container">
    <form onSubmit={handleSubmit} className="registration-form">
    <h1 className="form-title">Register</h1>

      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your full name"
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
          Register
        </button>
        <p><center>Already registered? <a href="/login">Login</a></center></p>
      </div>

    </form>
    <ToastContainer />
  </div>

  {/* Right: Subscription Cards */}
  
</div>

  );
}

export default Signup;
