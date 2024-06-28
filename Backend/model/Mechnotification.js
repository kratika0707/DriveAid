// models/Notification.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MechnotificationSchema = new Schema({
  MechanicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mechanic', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const MechNotification = mongoose.model('MechNotification', MechnotificationSchema);
module.exports = MechNotification;
