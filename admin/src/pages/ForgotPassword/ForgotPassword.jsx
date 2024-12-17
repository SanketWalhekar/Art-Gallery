import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const navigate = useNavigate();


  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/send-otp', { email });
      toast.success(response.data.message, {
        position: 'top-right',
      });
      setShowOtpField(true);
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to send OTP.', {
            position: 'top-right',
        });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/verify-otp', { email, otp });
      toast.success(response.data.message, {
        position: 'top-right',
    });

    setTimeout(() =>navigate('/reset-password', { state: { email: email } }),4000);

    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to verify OTP.', {
            position: 'top-right',
        });
    }
  };

  return (
    <>
    <ToastContainer />

    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={handleSendOtp}>Send OTP</button>
      </div>
      {showOtpField && (
        <div>
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
    </>
  );
};

export default ForgotPassword;
