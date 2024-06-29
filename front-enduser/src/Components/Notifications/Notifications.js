import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);
  const userId = useSelector(state => state.user.userId);

  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        console.log(userId);
        const response = await axios.get(`http://localhost:5000/api/users/${userId}/notifications`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching user notifications:', error);
      }
    };

    fetchUserNotifications();

    const ws = new WebSocket('ws://localhost:8000');

    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'SERVICE_ASSIGNED' && message.payload.userId === userId) {
        // Mark the notification as new
        const newNotification = { ...message.payload, isNew: true };
        setNotifications((prev) => [...prev, newNotification]);
        setNewNotifications((prev) => [...prev, newNotification]);
      }
    };

    return () => ws.close(); // Close WebSocket connection on component unmount
  }, [userId]);

  const handleNotificationClick = (notification) => {
    setNewNotifications((prev) =>
      prev.filter((notif) => notif !== notification)
    );
  };

  return (
    <div style={{ height: 'auto', minHeight: '100vh', marginTop: '10%' }}>
      <h2>Your Notifications</h2>
      {notifications.map((notification, index) => (
        <div
          key={index}
          style={{
            backgroundColor: newNotifications.includes(notification)
              ? 'yellow'
              : 'white',
          }}
          onClick={() => handleNotificationClick(notification)}
        >
          <p>{notification.message}</p>
          <Link to={`/${userId}/user/service/${notification.serviceId}`}>
            View Service Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserNotifications;
