import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success('Payment Successful! Your registration is complete.');

    // Redirect to login after 3 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    });

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <ToastContainer />
      <h1>Payment Successful!</h1>
      <p>You will be redirected to the login page shortly.</p>
    </div>
  );
};

export default PaymentSuccess;
