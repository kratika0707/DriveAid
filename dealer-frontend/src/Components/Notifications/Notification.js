import React, { useEffect, useState } from 'react';

const Notification = ({ dealerId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'NEW_SERVICE_REQUEST' && message.payload.receiverId === dealerId) {
        setNotifications((prev) => [...prev, message.payload]);
      }
    };

    return () => ws.close();
  }, [dealerId]);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notification, index) => (
        <div key={index}>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
