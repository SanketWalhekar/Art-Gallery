import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  const onSendOtp = async () => {
    try {
      const response = await axios.post(`${url}/api/user/send-otp`, { email: otpEmail });
      if (response.data.success) {
        alert("OTP sent to your email!");
        setCurrState("Verify OTP");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const onVerifyOtp = async () => {
    try {
      const response = await axios.post(`${url}/api/user/reset-password`, { email: otpEmail, otp, newPassword });
      if (response.data.success) {
        alert("Password reset successfully!");
        setCurrState("Login");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className='Login-Popup'>
      {currState === "Forgot Password" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSendOtp();
            }}
            className='login-popup-container'
          >
          <div className="login-popup-inputs">

            <h2>Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={otpEmail}
              onChange={(e) => setOtpEmail(e.target.value)}
              required
            />
            </div>

            <button type="submit">Send OTP</button>
            <p onClick={() => setCurrState("Login")}>Cancel</p>
          </form>
        // </div>
      )}

      {currState === "Verify OTP" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCurrState("Reset Password");
            }}
            className='login-popup-container'
          >
            <div className="login-popup-inputs">



            <h2>Verify OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            </div>
            <button type="submit">Verify OTP</button>
            <p onClick={() => setCurrState("Login")}>Cancel</p>
          </form>
      )}

      {currState === "Reset Password" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onVerifyOtp();
            }}
            className='login-popup-container'
          >
            <div className="login-popup-inputs">


            <h2>Reset Password</h2>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Re-enter new password"
              required
            />
            </div>

            <button type="submit">Reset Password</button>
            <p onClick={() => setCurrState("Login")}>Cancel</p>
          </form>
      )}

      {currState === "Login" || currState === "Sign up" ? (
        <form onSubmit={onLogin} className='login-popup-container'>
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
          </div>
          <div className="login-popup-inputs">
            {currState === "Login" ? (
              <>
                <input
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  type="email"
                  placeholder="Your Email"
                  required
                />
                <input
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                  type='password'
                  placeholder='Password'
                  required
                />
              </>
            ) : (
              <>
                <input
                  name='name'
                  onChange={onChangeHandler}
                  value={data.name}
                  type="text"
                  placeholder='Your Name'
                  required
                />
                <input
                  name='email'
                  onChange={onChangeHandler}
                  value={data.email}
                  type="email"
                  placeholder='Your Email'
                  required
                />
                <input
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                  type='password'
                  placeholder='Password'
                  required
                />
              </>
            )}
          </div>
          <button type='submit'>{currState === "Sign up" ? "Create Account" : "Login"}</button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          {currState === "Login" ? (
            <>
              <p>Create a new account? <span onClick={() => setCurrState("Sign up")}>Click here</span></p>
              <p>Forgot Password? <span onClick={() => setCurrState("Forgot Password")}>Click here</span></p>
            </>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
          )}
        </form>
      ) : null}
    </div>
  );
};

export default LoginPopup;
