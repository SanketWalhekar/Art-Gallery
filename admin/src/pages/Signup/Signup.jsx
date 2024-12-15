import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'IN',
  });
  const [subscriptionType, setSubscriptionType] = useState('yearly');

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/register/create-checkout-session',
        {
          name,
          email,
          password,
          address,
          subscriptionType,
        }
      );

      // const { url } = response.data;
      // window.location.href = url; // Redirect to Stripe Checkout

      const {session_url}=response.data;
      window.location.replace(session_url);
      
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
    <div className="registration-form-container">
      <h1 className="form-title">Register</h1>
      <form onSubmit={handleSubmit} className="registration-form">
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
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="Address Line 1"
            required
            onChange={(e) => setAddress({ ...address, line1: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            required
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="State"
            required
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
          <input
            type="text"
            placeholder="Postal Code"
            required
            onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subscription">Subscription Type</label>
          <select
            id="subscription"
            onChange={(e) => setSubscriptionType(e.target.value)}
          >
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Pay & Register
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
