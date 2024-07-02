import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const MechNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const { mechauthState } = useContext(AuthContext);
  const mechanicId = mechauthState.mechanicId; // Get the dealerId from authState
  const [highlightedNotifications, setHighlightedNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, [mechanicId]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/mechanic/${mechanicId}/notifications`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:7000');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'NEW_SERVICE_REQUEST' && message.payload.mechanicId === mechanicId) {
        const newNotification = { ...message.payload, isNew: true };
        setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
        setHighlightedNotifications((prev) => [...prev, newNotification]);
      }
    };

    return () => ws.close();
  }, [mechanicId]);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notification, index) => (
        <div key={index} style={{ backgroundColor: highlightedNotifications.includes(notification) ? 'yellow' : 'white' }}>
          <p>{notification.message}</p>
          <Link to={`${notification.link}/${notification.serviceId}`}>View Service Request</Link>
        </div>
      ))}
    </div>
  );
};

export default MechNotification;
