import React, { useState, useEffect, useContext } from 'react';
import image from '../Assets/3331465.jpg';
import axios from 'axios';
import Modal from 'react-modal';
import Login from '../Login/Login';
import { useSelector, useDispatch } from 'react-redux';

import { login,logout } from '../../Redux/Features/userslice';

Modal.setAppElement('#root');

const Booking = () => {
  const urlback = 'http://localhost:5000/api';

  const [phone, setPhone] = useState('');
  const [issue, setIssue] = useState('');
  const [carmodel, setCarModel] = useState('');
  const [useri, setUseri] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user);
  const userId = useSelector(state => state.user.userId);
 
  const dispatch = useDispatch();
  const [dateofservice, setdateofservice] = useState('');
  const [timeofservice, settimeofservice] = useState('');

  useEffect(() => {
    const getCurrentDateTime = () => {
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toLocaleTimeString();
      setdateofservice(date);
      settimeofservice(time);
    };

    getCurrentDateTime();
  }, []);

  function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const loc = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(loc);
            resolve(loc);
          },
          (error) => {
            setError("Unable to retrieve your location.");
            reject(error);
          },
          { timeout: 10000 }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
        reject(new Error("Geolocation is not supported by your browser."));
      }
    });
  }

  async function submit(e) {
    e.preventDefault();
    if (!isAuthenticated) {
      setModalIsOpen(true);
      return;
    }

    try {
      const loc = await getLocation();
      const data = {
        userid:userId,
        location: loc,
        carmodel,
        issue,
        dateofservice,
        timeofservice,
      };

      setFormSubmitted(true);
      await axios.post(`${urlback}/services/book`, data);

      setPhone('');
      setCarModel('');
      setIssue('');
      setLocation({ latitude: null, longitude: null });
      setSuccessMessage('Request submitted successfully!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

    } catch (e) {
      console.error('Error submitting form:', e);
    }
  }

  function handleLoginSuccess(loggedInUser) {
    setUseri(loggedInUser);
    localStorage.setItem('userId', JSON.stringify(loggedInUser));
    setModalIsOpen(false);
    if (formSubmitted) {
      submit(new Event('submit'));
    }
  }

  return (
    <>
    
      <div className="container1" style={{ position: 'relative', height: '120vh', width: '100vw', margin: 0, padding: 0 }}>
        <img src={image} alt="car" style={{ position: 'absolute', top: 0, left: 0, height: '90%', width: '100vw', objectFit: 'cover', zIndex: '0' }} />
      </div>
      <div>
      {successMessage && (
          <div className="alert alert-success mt-3" role="alert">
            {successMessage}
          </div>
        )}
        <div style={{ top: 0, left: 0, width: '100%', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
          <h2 className='about' style={{ color: '#ea422b', fontSize: '3vw' }}>Book a Service</h2>
        </div>
        <p style={{ marginLeft: '5%', color: 'black', fontSize: '1.5em', marginBottom: '2%' }}>In urgent need? Book our service now and get immediate assistance wherever you are.</p>
      </div>
      <div className='container' style={{ height: '100vh' }}>
        <form onSubmit={submit}>
          <div className="mb-3" style={{ width: '50%' }}>
            <label htmlFor="exampleInputPhone" className="form-label">Contact Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              placeholder='+91 00000-00000'
              id="exampleInputPhone"
              style={{ height: '40px', fontSize: '80%' }}
            />
          </div>
          <div className="mb-3" style={{ width: '50%' }}>
            <label htmlFor="exampleInputModel" className="form-label">Your Car Model</label>
            <input
              type="text"
              value={carmodel}
              onChange={(e) => setCarModel(e.target.value)}
              className="form-control"
              placeholder='Car Model'
              id="exampleInputModel"
              style={{ height: '40px', fontSize: '80%' }}
            />
          </div>
          <div className="mb-3" style={{ width: '70%' }}>
            <label htmlFor="exampleInputIssue" className="form-label">Your Issue</label>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="form-control"
              id="exampleInputIssue"
              rows="4"
              placeholder='Type your issue here'
              style={{ minHeight: '80px', resize: 'vertical', fontSize: '80%' }}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ height: '40px', width: 'auto', marginTop: '1%', lineHeight: '5px' }}>Submit</button>
          
        </form>
        
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <Login
          phone={phone}
          urlback={urlback}
          onLoginSuccess={handleLoginSuccess}
        />
      </Modal>
    </>
  );
}

export default Booking;
