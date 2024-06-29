// websocket.js
const SocketServer = require('ws');

const wss = new SocketServer.Server({ port: 8000 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const sendNotificationtoUser = (userId, message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === SocketServer.OPEN) {
        client.send(JSON.stringify({ userId, ...message }));
      }
    });
  };

module.exports = { sendNotificationtoUser };
