// server.js (or your main server file)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sendNotification } = require('./WebSocket');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./router/auth-router');
const serviceRoutes = require('./router/Servicerouter');
const dealerRoutes = require('./router/dealer-router');
const mechanicRoutes = require('./router/mechanic-router');
const notificationRoutes = require('./router/notificationrouter');
const usernotificationRoutes = require('./router/usernotificationrouter');
const mechnotificationRoutes = require('./router/Mechnotificationrouter');


app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/dealers', dealerRoutes);
app.use('/api/mechanic', mechanicRoutes);
app.use('api/notification',notificationRoutes);
app.use('/api/usernotifications',usernotificationRoutes);
app.use('/api/mechnotifications', mechnotificationRoutes);

const DB = process.env.MONGODB_URI;

const connect = () => {
    console.log("coonected");
  return mongoose.connect(DB);
};

app.get('/', (req, res) => {
  res.send('Express running');
});

const start = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
