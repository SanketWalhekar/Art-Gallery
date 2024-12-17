import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PaymentSuccess.css';


const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const email = searchParams.get('email');
  const navigate = useNavigate();
  const url = 'http://localhost:4000';

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + '/api/register/payment-success', { success, email });
      console.log(response.data);
      console.log(response);

      if (response.data.success) {
        toast.success('Payment verified successfully!', { position: 'top-right' });
        setTimeout(() => navigate('/login'), 5000); // Redirect after 3 seconds
      } else {
        toast.error('Payment verification failed.', { position: 'top-right' });
        setTimeout(() => navigate('/'), 5000); // Redirect after 3 seconds
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during payment verification.', { position: 'top-right' });
      setTimeout(() => navigate('/'), 5000); // Redirect after 3 seconds
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="payment-success-container">
      <ToastContainer />
      <h1>Payment Successful!</h1>
      <p>You will be redirected to the login page shortly.</p>
    </div>
  );
};

export default PaymentSuccess;
