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

const Login = ({ phone, onLoginSuccess, urlback }) => {
  
  const [loginPhone, setLoginPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [user, setUser] = useState(null);
  const [showotp, setShowotp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const burl="http://localhost:5000/api/users/login";
  

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!loginPhone) {
      setErrorMessage('Please enter your phone number.');
      return;
    }
    setErrorMessage('');
    // Logic to send OTP
    onSignup();
    setShowotp(true); // Show OTP input after sending OTP
  };

  useEffect(() => {
    setLoginPhone(phone || '');
  }, [phone]);

  useEffect(() => {
    if (user) {
      handleLogin();
    }
  }, [user]);

  const handleLogin = async (e) => {
    /*
    if (!user) {
      console.error('User is not logged in.');
      return;
    }
  */
    try {
      const response = await axios.post(burl, {
        userId: user,
        loginPhone: loginPhone,
      });
      setUser(response.userId);
      console.log('Success:', response.data);
      onLoginSuccess(response.data.userId);
    } catch (error) {
      console.log(error);
    }
  };
  

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          onSignup()
        },
        'expired-callback': () => {
          console.log("reCAPTCHA expired");
        }
      });
    }
  }
  // function onSignup() {
  //   const appVerifier = window.recaptchaVerifier;
  //   const formatPh = '+' + loginPhone;
  //   signInWithPhoneNumber(auth, formatPh, appVerifier)
  //     .then((confirmationResult) => {
  //       window.confirmationResult = confirmationResult;
  //       toast.success("OTP sent successfully!");
  //     }).catch((error) => {
  //       console.log(error);
  //       toast.error("Failed to send OTP!")
  //     });
  // }
  function onSignup() {
    onCaptchVerify()
    const appVerifier = window.recaptchaVerifier;
    const formatPh = '+' + loginPhone;
    console.log(formatPh);
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP sent successfully!");
      }).catch((error) => {
        console.log(error)
        
        toast.error("Failed to send OTP!")
      });
  }
  function onOTPVerify(){
    window.confirmationResult.confirm(otp).then(async(res)=>{
      console.log(res)
      setUser(res.user.uid)
      console.log(user)
      toast.success("Correct OTP");
      //await handleLogin();
    })
    .catch((err)=>{
      console.log(err);
      toast.error("Invalid OTP. Please try again.");
    })

  }
  return (
    <>
      <div className="container flex gap-1 items-center justify-center" style={{ height: 'auto', width: '40vw' }}>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        <h3 style={{ marginBottom: '2%' }}>Please Login!</h3>
        <div>
          {/* <div className="mb-3" style={{ width: '60%' }}>
            <label htmlFor="exampleInputEmail" className="form-label">Email Id</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              style={{ height: '40px', fontSize: '85%',border:'1px solid black' }}
              required
            />
          </div> */}
          {
            showotp ?
              <>
                <div className="mb-3" >
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
                  <label ></label>
                  <PhoneInput
                    country={"in"}
                    
                    
                    value={loginPhone}
                    onChange={setLoginPhone}
                    style={{ height: '100px', fontSize: '100%',marginBottom:'2%'}}
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
