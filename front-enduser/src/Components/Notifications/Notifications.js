import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}/notifications`);
        const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotifications(sortedNotifications);
      setNewNotifications(sortedNotifications.filter(notification => !notification.read));
      } catch (error) {
        console.error('Error fetching user notifications:', error);
      }
    };

    fetchUserNotifications();

    const ws = new WebSocket('ws://localhost:8000');
    
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };
  
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'SERVICE_ASSIGNED' && message.payload.userId === userId) {
        const newNotification = { ...message.payload, isNew: true };
        setNotifications((prev) => [...prev, newNotification]);
        setNewNotifications((prev) => [...prev, newNotification]);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  
    return () => ws.close();
  }, [userId]);

  const handleNotificationClick = async (notificationId) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/notifications/${notificationId}`, { read: true });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId ? { ...notification, read: true } : notification
        )
      );
      setNewNotifications((prev) => prev.filter((notif) => notif._id !== notificationId));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div style={{ height: 'auto', minHeight: '100vh', marginTop: '10%' }}>
      <h2>Your Notifications</h2>
      {notifications.map((notification, index) => (
        <div
          key={index}
          style={{
            backgroundColor: !notification.read ? 'yellow' : 'white',
          }}
          onClick={() => handleNotificationClick(notification._id)}
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
