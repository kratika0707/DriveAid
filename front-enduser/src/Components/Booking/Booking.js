import React, { useState, useEffect } from 'react';
import image from '../Assets/3331465.jpg';
import axios from 'axios';
import Modal from 'react-modal';
import Login from '../Login/Login';

Modal.setAppElement('#root'); // Ensure to set the root element for accessibility

const Booking = () => {
  const urlback = 'http://localhost:5000/api';

  const [phone, setPhone] = useState('');
  const [issue, setIssue] = useState('');
  const [model, setModel] = useState('');
  const [user, setUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // State variables for current date and time
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Check if the user is logged in
    const loggedInUser = localStorage.getItem('userId');
    if (loggedInUser) {
        try {
            const parsedUser = JSON.parse(loggedInUser);
            setUser(parsedUser);
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
            setUser(null); // Handle the error case by setting user to null
        }
    }
  }, []);

  useEffect(() => {
    // Function to get current date and time
    const getCurrentDateTime = () => {
      const now = new Date();
      const date = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const time = now.toLocaleTimeString(); // Format: HH:MM:SS
      
      setCurrentDate(date);
      setCurrentTime(time);
    };

    getCurrentDateTime();
  }, []);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setError("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              setError("An unknown error occurred.");
              break;
            default:
              setError("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }

  async function submit(e) {
    e.preventDefault();
    if (!user) {
      setModalIsOpen(true); // Open the login modal if not logged in
      return;
    }
    setFormSubmitted(true);
    try {
      getLocation();
      await axios.post(`${urlback}/services`, {
        user,
        location,
        model,
        issue,
        currentDate, // Include current date
        currentTime // Include current time
      });
      // Handle form submission success (e.g., show a success message, clear form)
    } catch (e) {
      console.log(e);
    }
  }

  function handleLoginSuccess(loggedInUser) {
    setUser(loggedInUser);
    console.log(loggedInUser);
    localStorage.setItem('userId', JSON.stringify(loggedInUser));
    setModalIsOpen(false);
    if (formSubmitted) {
      submit(); // Re-submit the form after successful login
    }
  }

  return (
    <>
      <div className="container1" style={{ position: 'relative', height: '120vh', width: '100vw', margin: 0, padding: 0 }}>
        <img src={image} alt="car" style={{ position: 'absolute', top: 0, left: 0, height: '90%', width: '100vw', objectFit: 'cover', zIndex: '0' }} />
      </div>
      <div>
        <div style={{ top: 0, left: 0, width: '100%', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
          <h2 className='about' style={{ color: '#ea422b', fontSize: '3vw' }}>Book a Service</h2>
        </div>
        <p style={{ marginLeft: '5%', color: 'black', fontSize: '1.5em', marginBottom: '2%' }}>In urgent need? Book our service now and get immediate assistance wherever you are.</p>
      </div>
      <div className='container' style={{ height: '100vh' }}>
        <form onSubmit={submit}>
          <div className="mb-3" style={{ width: '50%' }}>
            <label htmlFor="exampleInputPhone" className="form-label">Contact Number</label>
            <input type="string" onChange={(e) => { setPhone(e.target.value) }} className="form-control" placeholder='+91 00000-00000' id="exampleInputPhone" style={{ height: '40px', fontSize: '80%' }} />
          </div>
          <div className="mb-3" style={{ width: '50%' }}>
            <label htmlFor="exampleInputModel" className="form-label">Your Car Model</label>
            <input type="text" onChange={(e) => { setModel(e.target.value) }} className="form-control" placeholder='Car Model' id="exampleInputModel" style={{ height: '40px', fontSize: '80%' }} />
          </div>
          <div className="mb-3" style={{ width: '70%' }}>
            <label htmlFor="exampleInputIssue" className="form-label">Your Issue</label>
            <textarea onChange={(e) => { setIssue(e.target.value) }} className="form-control" id="exampleInputIssue" rows="4" placeholder='Type your issue here' style={{ minHeight: '80px', resize: 'vertical', fontSize: '80%' }}></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ height: '40px', width: 'auto', marginTop: '1%', lineHeight: '5px' }}>Submit</button>
          {error ? (
            <p>{error}</p>
          ) : (
            location.latitude !== null && (
              <p>
                Latitude: {location.latitude} <br />
                Longitude: {location.longitude}
              </p>
            )
          )}
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
          onLoginSuccess={handleLoginSuccess}
          urlback={urlback}
        />
      </Modal>
    </>
  );
}

export default Booking;
