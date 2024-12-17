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
  const [subscriptionType, setSubscriptionType] = useState("yearly");

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

      if(response.data.success){
          const {session_url}=response.data;
          window.location.replace(session_url);
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
      <div className="form-group1">
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
        <button type="submit" className="submit-button">
          Pay & Register
        </button>
        <p><center>Already registered? <a href="/login">Login</a></center></p>
      </div>

    </form>
    <ToastContainer />
  </div>

  {/* Right: Subscription Cards */}
  <div className="subscription-cards-container">
      <h1 class="choose"><center>Choose Your Plan</center></h1>
      <div className="pricing-cards">
      {/* Yearly Plan Card */}
      <div
        className={`card ${subscriptionType === "yearly" ? "active" : ""}`}
        onClick={() => setSubscriptionType("yearly")}
      >
        <h3>Professional</h3>
        <h4 className="starter_price">Rs. 500 / annually</h4>
        <h5 className="starter_text">Billed yearly</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, dicta
          reiciendis odio totam commodi ipsum iure voluptatibus corrupti neque
          deserunt, quas, error quaerat iste tempora laborum nobis exercitationem
          fugit. Autem.
        </p>
      
      </div>

      <div
        className={`card ${subscriptionType === "monthly" ? "active" : ""}`}
        onClick={() => setSubscriptionType("monthly")}>
        <h3>Basic</h3>
        <h4 className="pro_price">Rs. 50 / monthly</h4>
        <h5 className="pro_text">Billed monthly</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, nisi.
          Doloribus, ex. Nulla repellendus dignissimos odit numquam veritatis
          architecto, quis pariatur quaerat ipsam deserunt sint.
        </p>
        
      </div>

      
    </div>
    <div class="select">
        <p>Selected Plan: {subscriptionType === "yearly" ? "Yearly Plan" : "Monthly Plan"}</p>
      </div>
    </div>
</div>

  );
}

export default Signup;
