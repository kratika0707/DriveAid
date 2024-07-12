import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OtpInput from 'otp-input-react';
import '../Login/Login.css'
import { auth } from '../../Firebase.config';
import { RecaptchaVerifier } from 'firebase/auth';

import { Toaster } from 'react-hot-toast';
import { signInWithPhoneNumber } from 'firebase/auth';
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import { useSelector, useDispatch } from 'react-redux';

import { login, logout } from '../../Redux/Features/userslice';
import { useNavigate } from 'react-router-dom';

const Login = ({ phone, onLoginSuccess, urlback }) => {
  
  const [loginPhone, setLoginPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showotp, setShowotp] = useState(false);
  const [useri, setUseri] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const burl = "http://localhost:5000/api/users/login";
  const dispatch = useDispatch();
const navigate=useNavigate();
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!loginPhone) {
      setErrorMessage('Please enter your phone number.');
      return;
    }
    setErrorMessage('');
    onSignup();
    setShowotp(true); // Show OTP input after sending OTP
  };

  useEffect(() => {
    setLoginPhone(phone || '');
  }, [phone]);

  useEffect(() => {
    if (useri && loginPhone) {
      handleLogin();
    }
  }, [useri][loginPhone]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(burl, {
        userId: useri,
        loginPhone: loginPhone,
      });
      setUseri(response.userId);
      dispatch(login({ user: loginPhone, userId: useri })); // Dispatch login action
      
    } catch (error) {
      console.log(error);
    }
  };

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => onSignup(),
        'expired-callback': () => {
          console.log("reCAPTCHA expired");
        }
      });
    }
  }

  function onSignup() {
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = '+' + loginPhone;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP sent successfully!");
      }).catch((error) => {
        console.log(error);
        toast.error("Failed to send OTP!");
      });
  }

  function onOTPVerify() {
    window.confirmationResult.confirm(otp).then(async (res) => {
      setUseri(res.user.uid);
      
      toast.success("Correct OTP");
      navigate('/');
    })
    .catch((err) => {
      console.log(err);
      toast.error("Invalid OTP. Please try again.");
    });
  }

  return (
    <>
      <div className="container flex gap-1 items-center justify-center" style={{ height: 'auto', width: '40vw' }}>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        <h3 style={{ marginBottom: '2%' }}>Please Login!</h3>
        <div>
          {
            showotp ?
              <>
                <div className="mb-3">
                  <label htmlFor="exampleInputOtp" className="form-label">Enter OTP</label>
                  <OtpInput
                    className="otp-container"
                    OTPLength={6}
                    otptype="number"
                    disabled={false}
                    autofocus
                    id="exampleInputOtp"
                    value={otp}
                    onChange={setOtp}
                    style={{ fontSize: '85%' }}
                    required
                  />
                </div>
                <button onClick={onOTPVerify} type="submit" className="btn btn-primary"
                  style={{ height: '30px', width: 'auto', marginTop: '1%', lineHeight: '2px' }}>Submit
                </button>
              </>
              :
              <>
                <div className="mb-3" style={{ width: '70%' }}>
                  <PhoneInput
                    country={"in"}
                    value={loginPhone}
                    onChange={setLoginPhone}
                    style={{ height: '100px', fontSize: '100%', marginBottom: '2%' }}
                    required
                  />
                  {errorMessage && <div style={{ color: 'red', fontSize: '85%' }}>{errorMessage}</div>}
                </div>
                <button type="submit" className="btn btn-primary flex gap-1 items-center justify-center py-2.5" onClick={handleSendOtp}
                  style={{ height: '30px', width: 'auto', marginTop: '1%', lineHeight: '2px' }}>Send OTP
                </button>
              </>
          }
        </div>
      </div>
    </>
  );
};

export default Login;
