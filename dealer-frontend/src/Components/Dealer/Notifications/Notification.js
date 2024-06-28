import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { authState } = useContext(AuthContext);
  const dealerId = authState.dealerId; // Get the dealerId from authState

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/dealers/${dealerId}/notifications`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'NEW_SERVICE_REQUEST' && message.payload.dealerId === dealerId) {
        setNotifications((prev) => [...prev, message.payload]);
      }
    };

    return () => ws.close();
  }, [notifications,dealerId]);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notification, index) => (
        <div key={index}>
          <p>{notification.message}</p>
          <Link to={notification.link}>View Service Request</Link>
        </div>
      ))}
    </div>
  );
};

export default Notification;
