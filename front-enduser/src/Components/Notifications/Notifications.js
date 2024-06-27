import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  
  const userId = useSelector(state => state.user.userId);

  
  

  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}/notifications`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching user notifications:', error);
      }
    };

    fetchUserNotifications();

    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'SERVICE_UPDATE' && message.payload.userId === userId) {
        // Update notifications state with the new message payload
        setNotifications((prev) => [...prev, message.payload]);
      }
    };

    return () => ws.close(); // Close WebSocket connection on component unmount
  }, [userId]);

  return (
    <div style={{height:'auto', minHeight:'100vh'}}>
      <h2>Your Notifications</h2>
      {notifications.map((notification, index) => (
        <div key={index}>
          <p>{notification.message}</p>
          <Link to={`/user/services/${notification.serviceId}`}>View Service Details</Link>
        </div>
      ))}
    </div>
  );
};

export default UserNotifications;
