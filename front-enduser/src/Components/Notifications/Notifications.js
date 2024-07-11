import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Notification.css'
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
      console.log('Connected to WebSocket');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.payload.userid === userId) {
        setNotifications((prevNotifications) => [data.payload, ...prevNotifications]);
        setNewNotifications((prevHighlighted) => [data.payload, ...prevHighlighted]);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    return () => {
      ws.close();
    };
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
    <>
      {/* <div style={{ height: 'auto', minHeight: '100vh', marginTop: '10%' }}>
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
    </div> */}
      <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: '10px auto', width: '70%' }}>
        <h2 style={{ margin: '2%', fontSize: '2.5rem', marginTop: '8%' }}>Notifications</h2>
        <div style={{ width: '100%', overflowY: 'auto', margin: '1%' }}>
          {Object.keys(groupedNotifications).map((date, index) => (
            <div key={index} style={{ marginBottom: '20px', position: 'relative' }}>
              <h3 style={{ marginBottom: '20px', color: 'white', fontSize: '1.15rem', textAlign: 'center', borderRadius: '20px', display: 'inline-block', padding: '5px 10px', backgroundColor: '#0078d6', paddingLeft: '1.5%', paddingRight: '1.5%' }}>
                {formatDatee(date)}
              </h3>
              <div style={{ border: '1px solid white' }}>
                {groupedNotifications[date].map((notification, i) => (
                  <div
                    key={i}
                    style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid grey', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <p style={{ fontWeight: 'bold', marginRight: '20px', marginTop:'15px' }}>{formatTime(notification.createdAt)}</p>
                      <div>
                        <Link to={`/${userId}/user/service/${notification.serviceId}`} onClick={() => handleNotificationClick(notification._id)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                          <p style={{ fontWeight: notification.read ? '400' : '600', color: notification.read ? 'grey' : 'black', margin: 0, width:'500px' }}>
                            {notification.message}
                          </p>
                          {!notification.read && (
                            <span style={{ backgroundColor: '#0078d6', color: 'white', borderRadius: '4px', padding: '2px 4px', marginLeft: '10px', fontSize: '0.8rem' }}>New</span>
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
    </>
  );
};

export default UserNotifications;
