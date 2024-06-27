// models/Notification.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsernotificationSchema = new Schema({
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const UserNotification = mongoose.model('UserNotification', UsernotificationSchema);
module.exports = UserNotification;
