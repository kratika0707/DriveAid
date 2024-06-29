// models/Notification.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  dealerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  link:{type:String, rquired:true}
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
