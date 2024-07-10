import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OtpInput from 'otp-input-react';
import { auth } from '../../Firebase.config';
import { RecaptchaVerifier } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';
import { signInWithPhoneNumber } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const CompleteService = () => {
  const { serviceId } = useParams();
  const [loginPhone, setLoginPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showotp, setShowotp] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [userdetail, setUserdetail] = useState(null);
  const [completeservice, setCompleteservice] = useState(false);

  useEffect(() => {
    fetchServiceDetails();
  }, [serviceId]);

  useEffect(() => {
    if (service) {
      fetchUserDetails();
    }
  }, [service]);

  useEffect(() => {
    if (completeservice) {
      console.log('done')
      Completeservicefull();
    }
  }, [completeservice]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!loginPhone) {
      setErrorMessage('Fetching user details...');
      fetchUserDetails();
    } else {
      setErrorMessage('');
      onSignup();
      setShowotp(true); // Show OTP input after sending OTP
    }
  };

  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/services/${serviceId}`);
      if (response.status !== 200) {
        throw new Error('Service not found');
      }
      const service = response.data;
      // Convert location fields to string
      service.location.latitude = convertDecimal128ToString(service.location.latitude);
      service.location.longitude = convertDecimal128ToString(service.location.longitude);
      setService(service);
    } catch (error) {
      console.error('Error fetching service details:', error);
      setError('Service not found');
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/userdetails/${service.userid}`);
      setUserdetail(response.data);
      const userPhone = response.data.phone; // Use phone number from the response
      setLoginPhone(userPhone);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setErrorMessage('Error fetching user details.');
    }
  };

  const convertDecimal128ToString = (decimal128) => {
    return decimal128 ? decimal128.$numberDecimal.toString() : null;
  };

  const Completeservicefull = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/services/completeservice/${serviceId}`);
      if (response.status === 200) {
        console.log('Service status updated successfully');
        navigate('/'); // Redirect after completing service
      } else {
        console.error('Failed to update service status');
      }
    } catch (error) {
      console.error('Error updating service status:', error);
    }
  };

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => onSignup(),
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
        },
      });
    }
  }

  function onSignup() {
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = `+${loginPhone}`;
    console.log(formatPh);
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success('OTP sent successfully!');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to send OTP!');
      });
  }

  function onOTPVerify() {
    window.confirmationResult.confirm(otp)
      .then(async (res) => {
        
        toast.success('Correct OTP');
        
        await Completeservicefull();
        
      })
      .catch((err) => {
        console.log(err);
        toast.error('Invalid OTP. Please try again.');
      });
  }

  return (
    <>
      <div className="container flex gap-1 items-center justify-center" style={{ height: 'auto', width: '40vw' }}>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        <h3 style={{ marginBottom: '2%' }}>Send OTP to user</h3>
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

export default CompleteService;
