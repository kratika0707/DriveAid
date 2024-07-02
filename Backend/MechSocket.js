// websocket.js
const MechSocket = require('ws');

const wss = new MechSocket.Server({ port: 7000 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const sendNotificationtoMech = (mechanicId, message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === MechSocket.OPEN) {
        client.send(JSON.stringify({ mechanicId, ...message }));
      }
    });
  };

module.exports = { sendNotificationtoMech };
