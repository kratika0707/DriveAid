const express = require('express');
const router = express.Router();
const Service= require('../model/Service')
const Order = require('../model/Order'); // Assuming you have an Order model set up
const Cart = require('../model/Cart');
const { sendNotification } = require('../WebSocket');
const { sendNotificationtoUser} =require('../SocketServer');
const UserNotification= require('../model/Usernotifications');
const Notification= require('../model/Notifications');

exports.placeOrder = async (req, res) => {
    const { mechanicId, productIds, address, location, value, serviceId } = req.body;

    try {
        // Create a new order
        const newOrder = new Order({
            mechanicId,
            productIds,
            address,
            location,
            placedAt: Date.now(),
            value, 
            serviceId
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();
        await Cart.deleteMany({ mechanicId });
        
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        const { userid, dealerId } = service;


        // const newNotification = new Notification({
        //   dealerId: dealerId,
        //   serviceId: serviceId,
        //   message: `Order placed for a service request`,
        //   link: `dealer/service`,
        // });
  
        // await newNotification.save();
  
        // // Send the notification to the nearest dealer
        // sendNotification({
        //   type: 'NEW_SERVICE_REQUEST',
        //   payload: {
        //     dealerId: dealerId,
        //     _id:newNotification._id,
        //     createdAt:newNotification.createdAt,
            
        //     serviceId: serviceId,
        //     message: newNotification.message,
        //     link: `dealer/service/${serviceId}`
        //   },
        // });



        const newUserNotification = new UserNotification({
          UserId: userid,
         DealerId:dealerId,
          serviceId: serviceId,
          message: `Order has been placed for your service request`,
          link: `user/service/`
        });
  
        await newUserNotification.save();
  
        sendNotificationtoUser(userid, {
          type: 'SERVICE_ASSIGNED',
          payload: {
            userId: userid,
            serviceId: serviceId,
            _id:newUserNotification._id,
            createdAt:newUserNotification.createdAt,
            // read:'false',
            message: newUserNotification.message,
            link: `${userid}/user/service/${serviceId}`
          },
        });

        res.status(201).json({ message: 'Order placed successfully!', order: savedOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
};


exports.serviceOrderHistory =async(req,res)=>{
    const { serviceId } = req.params;
    try {
      const orders = await Order.find({ serviceId: serviceId }); // Replace with your actual query
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }
  