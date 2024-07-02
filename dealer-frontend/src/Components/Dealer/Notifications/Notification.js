import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { authState } = useContext(AuthContext);
  const dealerId = authState.dealerId; // Get the dealerId from authState
  const [newNotifications, setNewNotifications] = useState([]); // Track unread notifications

  useEffect(() => {
    fetchNotifications();
  }, [dealerId]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/dealers/${dealerId}/notifications`);
      const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotifications(sortedNotifications);
      setNewNotifications(sortedNotifications.filter(notification => !notification.read));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'NEW_SERVICE_REQUEST' && message.payload.dealerId === dealerId) {
        const newNotification = { ...message.payload, isNew: true };
        setNotifications(prevNotifications => [...prevNotifications, newNotification]);
        setNewNotifications(prev => [...prev, newNotification]);
      }
    };

    return () => ws.close();
  }, [dealerId]);

  const handleNotificationClick = async (notificationId) => {
    try {
      await axios.patch(`http://localhost:5000/api/dealers/notifications/${notificationId}`, { read: true });
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification._id === notificationId ? { ...notification, read: true } : notification
        )
      );
      setNewNotifications(prev =>
        prev.filter(notification => notification._id !== notificationId)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notification, index) => (
        <div
          key={index}
          style={{ backgroundColor: newNotifications.some(notif => notif._id === notification._id) ? 'yellow' : 'white' }}
        >
          <p>{notification.message}</p>
          <Link to={`${notification.link}/${notification.serviceId}`} onClick={() => handleNotificationClick(notification._id)}>
            View Service Request
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Notification;
