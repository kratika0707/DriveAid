import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Login from '../Login/Login';
import { useSelector, useDispatch } from 'react-redux';

import { login,logout } from '../../Redux/Features/userslice';
import { Link } from 'react-router-dom';

const History = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [serviceHistory, setServiceHistory] = useState([]);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user);
  const userId = useSelector(state => state.user.userId);
 
  const dispatch = useDispatch();
  
  
  
  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      console.log(isAuthenticated)
      console.log(user);
      console.log(userId);
      fetchServiceHistory(userId);
    }
  }, [isAuthenticated, userId]);
  
  const fetchServiceHistory = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/services/history/${userId}`);
      setServiceHistory(response.data);
    } catch (error) {
      console.error('Error fetching service history:', error);
    }
  };
  
  return (
    <>
      <div className="container" style={{ height: 'auto', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', marginTop: '10%' }}>Your Service History</h1>
        {serviceHistory.length > 0 ? (
          <ul>
            {serviceHistory.map((service) => (
              <Link to={`user/notification/${userId}/user/service/${service._id}`} >
                <li key={service._id}>
                  <p>{service._id}</p>
                  <p>Date of Service: {service.dateofservice}</p>
                  <p>Time of Service: {service.timeofservice}</p>
                  <p>Car Model: {service.carmodel}</p>
                  <p>Issue: {service.issue}</p>
                  <p>Status: {service.servicestatus}</p>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p>No service history available.</p>
        )}
      </div>
  
      <Modal
        isOpen={showLoginModal}
        onRequestClose={() => setShowLoginModal(false)}
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
        <Login />
      </Modal>
    </>
  );
};

export default History;



