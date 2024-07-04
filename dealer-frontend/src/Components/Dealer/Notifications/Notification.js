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
        const newNotification = { ...message.payload, isNew: true, createdAt: new Date() };
        setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
        setNewNotifications(prev => [newNotification, ...prev]);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Group notifications by date
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const date = formatDate(notification.createdAt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notification);
    return acc;
  }, {});

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDatee = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(); // Adjust formatting as needed
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: '10px auto', width: '70%' }}>
      <h2 className='text-uppercase' style={{ margin: '2%', fontSize: '2.5rem', marginTop: '8%', color:'black', fontWeight:'600', fontFamily:'sans-serif' }}>Notifications</h2>
      <div style={{ width: '100%', overflowY: 'auto', margin: '1%' }}>
        {Object.keys(groupedNotifications).map((date, index) => (
          <div key={index} style={{ marginBottom: '20px', position: 'relative' }}>
            <h3 className='text-uppercase' style={{ marginBottom: '20px', color: 'black', fontWeight:'700',fontSize: '1.15rem', textAlign: 'center', borderRadius: '20px', display: 'inline-block', padding: '5px 10px', backgroundColor: '#ed6754', paddingLeft: '1.5%', paddingRight: '1.5%' }}>
              {formatDatee(date)}
            </h3>
            <div style={{ border: '1px solid white' }}>
              {groupedNotifications[date].map((notification, i) => (
                <div
                  key={i}
                  style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid grey', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px', height:'35px' }}>
                    <p style={{ fontSize: '1rem', margin: 0, color: 'black', fontWeight: '700', flexShrink: 0 }}>
                      {formatTime(notification.createdAt)}
                    </p>
                    <div style={{ flex: 1, marginLeft: '20px' }}>
                      <Link to={`${notification.link}/${notification.serviceId}`} onClick={() => handleNotificationClick(notification._id)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <p style={{ fontWeight: notification.read ? '400' : '600', color: notification.read ? 'grey' : 'black', margin: 0, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {notification.message}
                        </p>
                        {!notification.read && (
                          <span style={{ backgroundColor: 'red', color: 'white', borderRadius: '4px', padding: '2px 4px', marginLeft: '10px', fontSize: '0.8rem' }}>New</span>
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
